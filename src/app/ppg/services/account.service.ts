import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/api-response';
import { User } from '../models/account/user';
import { ResponseConfig } from '../config/response-config';
import { AuthService } from '../../auth/services/auth.service';
import { Account } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _user: any;
  private responseConfig: ResponseConfig;

  constructor(private http: HttpClient, private readonly authService: AuthService) {
    this._user = localStorage.getItem('currentUser');
    this.responseConfig = new ResponseConfig();
  }

  /**
   *
   * @returns los datos del usuario autenticado.
   */
  getAccount(): Observable<ApiResponse<Account>> {
    let url = environment.api + '/account';
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    let options = { headers: header };

    return this.http.get<ApiResponse<Account>>(url, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  updateAccount(user: User) {
    let url = environment.api + '/account';
    let params = user;
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
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
    let url = environment.api + '/account/password';
    let params = passwords;
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
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
}
