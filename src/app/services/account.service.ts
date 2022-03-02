import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _token: any;
  private _user: any;

  constructor(private http: HttpClient) {
    this._token = localStorage.getItem('token');
    this._user = localStorage.getItem('currentUser');
  }

  getAccount(): any {
    this._token = localStorage.getItem('token');
    let url = environment.api + '/account';
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this._token}`,
    });
    let options = { headers: header };
    return this.http.get<any>(url, options).pipe(
      catchError((err) => {
        throw this.handleError(err);
      })
    );
  }

  getTokenString() {
    try {
      return this._token;
    } catch (e) {
      console.log(e);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return new Error(
        error.error['message']
          ? error.error['message']
          : 'No se ha podido conectar con el servidor'
      );
    } else {
      return new Error(
        error.error['message'] ? error.error['message'] : 'Ha ocurrido un error'
      );
    }
  }
}
