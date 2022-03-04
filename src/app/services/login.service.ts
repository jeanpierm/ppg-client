import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _token: any;
  private _user: any;

  constructor(private http: HttpClient) {}

  Auth(data: any): any {
    let url = environment.api + '/auth/login';
    let params = data;
    let header = new HttpHeaders({ 'Content-type': 'application/json' });

    let options = {
      headers: header,
    };

    return this.http.post<any>(url, params, options).pipe(
      catchError((err) => {
        throw this.handleError(err);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }

      case 403: {
        return `Access Denied: ${error.message}`;
      }

      case 500: {
        return `Internal Server Error: ${error.message}`;
      }

      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
