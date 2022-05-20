import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { environment } from 'src/environments/environment';
import { ResponseConfig } from '../config/response-config';
import { User } from '../models/account/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  responseConfig: ResponseConfig;
  public users: User[];
  public fetchLoading: boolean = true;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.responseConfig = new ResponseConfig();
    this.users = [];
  }

  loadUsers() {
    !this.fetchLoading && (this.fetchLoading = true);
    this.getUser().subscribe((res) => {
      this.users = res.data;
      this.fetchLoading = false;
    });
  }

  getUser(queryString: string = ''): Observable<any> {
    const url = `${environment.api}/users${queryString}`;
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<any>(url, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  saveUser(user: User) {
    const url = `${environment.api}/users`;
    const body = user;
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.post<ApiResponse>(url, body, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  inactive(userId: string) {
    const url = `${environment.api}/users/${userId}`;
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.delete<ApiResponse>(url, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  active(userId: string) {
    const url = `${environment.api}/users/${userId}`;
    const body = {};
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.post<ApiResponse>(url, body, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }
}
