import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { UserLoginCredentials } from '../models/user-login-credentials';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User>  {
    return this.http.get(environment.API_BASE_URL + 'user/')
      .map((response: Response) => response as User)
      .catch((error: any) => Observable.throw(error));
  }

}
