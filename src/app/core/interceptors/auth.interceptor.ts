import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../../ppg/users/services/users.service';
import { ProfessionalProfilesService } from '../../ppg/professional-profiles/services/professional-profiles.service';
import { AuthService } from '../../auth/services/auth.service';
import { AccountService } from '../../ppg/account/services/account.service';
import { TechnologiesService } from '../../ppg/technologies/services/technologies.service';

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

function isAuthRequired(request: HttpRequest<unknown>): boolean {
  const requireAuthUrls = [
    UsersService.BASE_URL,
    ProfessionalProfilesService.BASE_URL,
    AccountService.BASE_URL,
    TechnologiesService.BASE_URL,
  ];

  return requireAuthUrls.some((url) => request.url.includes(url));
}
