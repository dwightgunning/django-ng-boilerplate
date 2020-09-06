import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.getUserLoginCredentials().pipe(
        map(
          userLoginCredentials => {
            if (userLoginCredentials) {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          })
        );
    }
}
