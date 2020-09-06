import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserLoginCredentials } from './models/user-login-credentials';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  private LOGIN_CREDENTIALS_KEY = 'userLoginCredentials';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('Authorization') === 'SkipInterceptor') {
      req = req.clone({ headers: req.headers.delete('Authorization')});
    } else {
      const headers = req.headers;
      try {
        const loadedCredentials: UserLoginCredentials =
          JSON.parse(localStorage.getItem(this.LOGIN_CREDENTIALS_KEY));
        if (loadedCredentials.token) {
          // Pass a cloned request instead of the original request to the next handle
          req = req.clone({ headers: req.headers.set('Authorization', 'JWT ' + loadedCredentials.token)});
        }
      } catch (e) { }
    }
    return next.handle(req);
  }
}
