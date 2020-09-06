import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { UserLoginCredentials } from '../models/user-login-credentials';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User>  {
    return this.http.get<User>(environment.API_BASE_URL + 'user/');
  }

}
