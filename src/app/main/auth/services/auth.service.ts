import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../admin/interfaces/account.interface';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { RegisterRequest } from '../interfaces/register-request.interface';
import {
  RegisterResponse,
  RefreshResponse,
} from '../interfaces/register-response.interface';
import { LoginComponent } from '../pages/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly BASE_URL = 'auth';
  private readonly ACCESS_TOKEN_KEY: string = 'accessToken';
  private readonly BEARER: string = 'Bearer';

  private _authAccount!: Account;

  get authAccount(): Account {
    return { ...this._authAccount };
  }

  get accessToken() {
    const jwt = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    return jwt ? `${this.BEARER} ${jwt}` : '';
  }

  set accessToken(tokenValue: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokenValue);
  }

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Inicia sesión. El token es guardado en localStorage como efecto secundario.
   * @param data
   */
  login(data: LoginRequest): Observable<LoginResponse> {
    const url = `${environment.api}/${AuthService.BASE_URL}/login`;

    return this.http.post<LoginResponse>(url, data).pipe(
      tap(({ accessToken, accountData }: LoginResponse) => {
        this.accessToken = accessToken;
        this._authAccount = accountData;
      })
    );
  }

  /**
   * Registra un nuevo usuario. El token es guardado en localStorage como efecto secundario.
   * @param data
   */
  register(data: RegisterRequest): Observable<RegisterResponse> {
    const url = `${environment.api}/${AuthService.BASE_URL}/register`;

    return this.http.post<RegisterResponse>(url, data).pipe(
      tap(({ accessToken, accountData }: RegisterResponse) => {
        this.accessToken = accessToken;
        this._authAccount = accountData;
      })
    );
  }

  validateAnRefreshToken(): Observable<boolean> {
    if (!this.accessToken) {
      return of(false);
    }

    const url = `${environment.api}/${AuthService.BASE_URL}/refresh`;
    const headers = new HttpHeaders({
      Authorization: this.accessToken,
    });

    return this.http.post<RefreshResponse>(url, null, { headers }).pipe(
      map(({ accessToken, accountData }) => {
        this.accessToken = accessToken;
        this._authAccount = accountData;
        return true;
      }),
      catchError(() => of(false))
    );
  }

  /**
   * Elimina todo el localStorage y navega a la ruta del login.
   */
  logout(): void {
    localStorage.clear();
    this._authAccount = undefined!;
    this.router.navigateByUrl(`/${LoginComponent.PATH}`);
    // location.reload();
  }
}
