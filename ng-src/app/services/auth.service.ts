import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { UserLoginCredentials } from '../models/user-login-credentials';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    } catch (e) {
      localStorage.removeItem('currentUser');
    }
  }

  public login(credentials: UserLoginCredentials): Observable<boolean> {
    return this.http.post(
        'http://localhost:8000/api/auth/login/',
        {
          username: credentials.username,
          password: credentials.password
        })
      .map(response => {
        const userLoginCreds = response.json() as UserLoginCredentials;

        if (userLoginCreds.token) {
          this.token = userLoginCreds.token;
          localStorage.setItem('currentUser', JSON.stringify(userLoginCreds));
          return true;
        } else {
          return false;
        }
      });
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  public getAuthToken(): string {
    const userLoginCredentials = JSON.parse(localStorage.getItem('currentUser')) as UserLoginCredentials;
    return userLoginCredentials.token;
  }
}
