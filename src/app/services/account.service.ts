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
import { ResponseConfig } from '../config/response-config';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _token: any;
  private _user: any;
  private responseConfig: ResponseConfig;

  constructor(private http: HttpClient) {
    this._token = localStorage.getItem('token');
    this._user = localStorage.getItem('currentUser');
    this.responseConfig = new ResponseConfig();
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
        throw this.responseConfig.handleError(err);
      })
    );
  }

  updateUser(user: User) {
    this._token = localStorage.getItem('token');
    let url = environment.api + '/account';
    let params = user;
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this._token}`,
    });

    let options = { headers: header };

    return this.http.patch<ApiResponse>(url, params, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  updatePassword(passwords: any) {
    this._token = localStorage.getItem('token');
    let url = environment.api + '/account/password';
    let params = passwords;
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this._token}`,
    });

    let options = { headers: header };

    return this.http.patch<ApiResponse>(url, params, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
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
}
