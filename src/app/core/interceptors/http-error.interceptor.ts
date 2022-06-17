import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { isAuthRequired } from './auth.interceptor';
import { AuthService } from '../../main/auth/services/auth.service';

// export function handleError(error: HttpErrorResponse): string {
//   switch (error.status) {
//     case 404: {
//       return error.message
//         ? `Not Found: ${error.message}`
//         : genericMessages.Response404;
//     }

//     case 403: {
//       return error.message
//         ? `Access Denied: ${error.message}`
//         : genericMessages.Response403;
//     }

//     case 500: {
//       return error.message
//         ? `Internal Server Error: ${error.message}`
//         : genericMessages.Response500;
//     }

//     default: {
//       return error.message
//         ? `Unknown Server Error: ${error.error.message}`
//         : 'Ha ocurrido un error';
//     }
//   }
// }

/**
 * Intercepta los errores que ocurren en las peticiones HTTP.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status === 401 && isAuthRequired(request)) {
          this.authService.logout();
        }
        return throwError(() => httpErrorResponse);
      })
    );
  }
}
