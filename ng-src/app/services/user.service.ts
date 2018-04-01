import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { UserLoginCredentials } from '../models/user-login-credentials';
import { AuthService } from './auth.service';


@Injectable()
export class UserService {

  constructor(private http: Http,
              private authService: AuthService) { }

  public getUser(): Observable<User>  {
    const headers = new Headers({'Authorization': 'JWT ' + this.authService.getAuthToken()});

    return this.http.get(
        'http://localhost:8000/api/user/',
        {headers: headers}
      ).map(response => response.json() as User);
  }

}
