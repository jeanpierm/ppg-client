import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from '../../admin/interfaces/account.interface';
import { LocalStorageKeys } from '../enums/local-storage-keys.enum';
import { Role } from '../enums/role.enum';
import { RoutesService } from './routes.service';
import { LoginRequest } from '../../main/login/interfaces/login-request.interface';
import { LoginResponse } from '../../main/login/interfaces/login-response.interface';
import { RegisterRequest } from '../../main/register/interfaces/register-request.interface';
import {
  RefreshResponse,
  RegisterResponse,
} from '../../main/register/interfaces/register-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly LOGIN_URL = environment.ppgApi.login;
  static readonly REGISTER_URL = environment.ppgApi.register;
  static readonly REFRESH_JWT_URL = environment.ppgApi.refreshJwt;
  private readonly BEARER: string = 'Bearer';

  private _authAccount!: Account;

  get authAccount(): Account {
    return { ...this._authAccount };
  }

  get accessToken() {
    const jwt = localStorage.getItem(LocalStorageKeys.AccessToken);
    return jwt ? `${this.BEARER} ${jwt}` : '';
  }

  set accessToken(tokenValue: string) {
    localStorage.setItem(LocalStorageKeys.AccessToken, tokenValue);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private routes: RoutesService
  ) {}

  /**
   * Inicia sesión. El token es guardado en localStorage como efecto secundario.
   * @param data
   */
  login(data: LoginRequest): Observable<LoginResponse> {
    const url = `${AuthService.LOGIN_URL}`;

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
    const url = `${AuthService.REGISTER_URL}`;

    return this.http.post<RegisterResponse>(url, data).pipe(
      tap(({ accessToken, accountData }: RegisterResponse) => {
        this.accessToken = accessToken;
        this._authAccount = accountData;
      })
    );
  }

  validateToken(): Observable<boolean> {
    if (!this.accessToken) {
      return of(false);
    }
    const url = `${AuthService.REFRESH_JWT_URL}`;
    return this.http.post<RefreshResponse>(url, null).pipe(
      map(({ accessToken, accountData }) => {
        this.accessToken = accessToken;
        this._authAccount = accountData;
        return true;
      }),
      catchError(() => of(false))
    );
  }

  validateTokenIsAdmin(): Observable<boolean> {
    if (!this.accessToken) {
      return of(false);
    }
    const url = `${AuthService.REFRESH_JWT_URL}`;
    return this.http.post<RefreshResponse>(url, null).pipe(
      map(({ accessToken, accountData }) => {
        this.accessToken = accessToken;
        this._authAccount = accountData;
        return accountData.roleName === Role.Admin;
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
    this.router.navigateByUrl(this.routes.loginRoute);
  }
}
