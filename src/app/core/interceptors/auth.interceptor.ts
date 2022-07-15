import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TechTypesService } from '../../admin/services/tech-types.service';
import { TechnologiesService } from '../../admin/services/technologies.service';
import { UsersService } from '../../admin/services/users.service';
import { AccountService } from '../../main/account/services/account.service';
import { DownloadPreferencesService } from '../../main/account/services/download-preferences.service';
import { AuthService } from '../../main/auth/services/auth.service';
import { ProfilesService } from '../../main/profiles/services/profiles.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (isAuthRequired(request)) {
      // Get the auth token from the service.
      const authToken = this.authService.accessToken;

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = request.clone({
        setHeaders: { Authorization: authToken },
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}

export function isAuthRequired(request: HttpRequest<unknown>): boolean {
  const requireAuthUrls = [
    UsersService.BASE_URL,
    ProfilesService.BASE_URL,
    AccountService.BASE_URL,
    TechnologiesService.BASE_URL,
    TechTypesService.baseUrl,
    DownloadPreferencesService.baseMeUrl,
  ];

  return requireAuthUrls.some((url) => request.url.includes(url));
}
