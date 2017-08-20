import { Injectable } from '@angular/core';
import { UserLoginCredentials } from '../models/user-login-credentials';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { User } from '../models/user';


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
