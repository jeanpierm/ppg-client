import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, retry } from 'rxjs';

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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1)
      // catchError((httpErrorResponse: HttpErrorResponse) => {
      //   console.log(httpErrorResponse);
      //   const errorMessage =
      //     httpErrorResponse.error instanceof ErrorEvent
      //       ? `Error: ${httpErrorResponse.error.message}`
      //       : `Error Code: ${httpErrorResponse.status}\nMessage: ${
      //           httpErrorResponse.error.message || httpErrorResponse.message
      //         }`;
      //   // window.alert(errorMessage);
      //   showErrorAlert(errorMessage);

      //   return throwError(() => new Error(errorMessage));
      // })
    );
  }
}
