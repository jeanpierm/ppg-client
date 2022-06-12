/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountComponent } from '../../account/account.component';
import { AuthService } from '../services/auth.service';

/**
 * Guardián para rutas que NO requieren autenticación (por ejemplo, el login).
 *
 * Si el usuario está autenticado, será re-direccionado a la página principal.
 */
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('no-auth-guard:can-activate');
    if (this.authService.accessToken) {
      this.router.navigateByUrl(`/${AccountComponent.PATH}`);
      return false;
    }
    return true;
  }
}
