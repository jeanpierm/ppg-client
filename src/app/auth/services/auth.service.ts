import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../auth/interfaces/auth';
import { LoginComponent } from '../../auth/pages/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly BASE_URL = 'auth';
  private readonly ACCESS_TOKEN_KEY: string = 'accessToken';
  private readonly BEARER: string = 'Bearer';

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
      tap((res: LoginResponse) => {
        this.accessToken = res.accessToken;
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
      tap((res: RegisterResponse) => {
        this.accessToken = res.accessToken;
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
      map(({ accessToken }) => {
        this.accessToken = accessToken;
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
    this.router.navigateByUrl(`${LoginComponent.PATH}`);
  }
}
