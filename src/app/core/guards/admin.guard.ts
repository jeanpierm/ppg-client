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
 * Guardián para rutas que requieren autenticación y rol "admin".
 *
 * Si el usuario no cumple, se regresa a la página anterior.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.validateTokenIsAdmin().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigate(['..']);
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.validateTokenIsAdmin().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigate(['..']);
        }
      })
    );
  }
}
