/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Guardián para rutas que requieren autenticación.
 *
 * Si el usuario no está autenticado, será re-direccionado al login.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.authService.logout();
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.authService.logout();
        }
      })
    );
  }
}
