import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserLoginCredentials } from '../models/user-login-credentials';

@Injectable()
export class AuthService {
  private LOGIN_CREDENTIALS_KEY = 'userLoginCredentials';
  userLoginCredentialsSubject = new ReplaySubject<UserLoginCredentials>(1);

  constructor(private http: HttpClient) {
    let storedUserLoginCredentials: UserLoginCredentials;
    try {
      storedUserLoginCredentials = JSON.parse(
        localStorage.getItem(this.LOGIN_CREDENTIALS_KEY)) as UserLoginCredentials;
    } catch ( err ) {
      // TODO: Shouldn't occur in practice. Investigate error reporting options.
    } finally {
      if (storedUserLoginCredentials && storedUserLoginCredentials.token) {
        // Check the stored credentials are still valid
        this.http.get(
            environment.API_BASE_URL + 'user/')
          .subscribe(
            (authenticatedToken: UserLoginCredentials) => {
              this.userLoginCredentialsSubject.next(storedUserLoginCredentials);
            },
            (err: any) => {
              localStorage.removeItem(this.LOGIN_CREDENTIALS_KEY);
            }
          );
      } else {
        localStorage.removeItem(this.LOGIN_CREDENTIALS_KEY);
        this.userLoginCredentialsSubject.next(null);
      }
    }
  }

  public login(credentials: UserLoginCredentials): Observable<UserLoginCredentials|string> {
    return this.http.post(
        environment.API_BASE_URL + 'auth/login/',
        {
          username: credentials.username,
          password: credentials.password,
          headers: new HttpHeaders({'Authorization': 'SkipInterceptor'})
        }).pipe(
        map((authenticatedToken: UserLoginCredentials) => {
          if (authenticatedToken.token) {
            const userLoginCredentials = new UserLoginCredentials(
              credentials.username,
              undefined,
              authenticatedToken.token);
            try {
              localStorage.setItem(
                this.LOGIN_CREDENTIALS_KEY,
                JSON.stringify(userLoginCredentials));
            } catch (e) {
              // If credentials cannot be stored (e.g. Safari incognito mode)
              // we can carry on with the user stored in the service's
              // user credentials Subject.
            }
            this.userLoginCredentialsSubject.next(userLoginCredentials);
            return userLoginCredentials;
          } else {
            this.userLoginCredentialsSubject.next(null);
            return 'Invalid username/password';
          }
        }));
  }

  public logout(): void {
    try {
      localStorage.removeItem(this.LOGIN_CREDENTIALS_KEY);
    } catch ( err ) { }
    this.userLoginCredentialsSubject.next(null);
  }

  public getUserLoginCredentials(): Observable<UserLoginCredentials> {
    return this.userLoginCredentialsSubject.asObservable().pipe(share());
  }
}
