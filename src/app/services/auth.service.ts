import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY: string = 'accessToken';
  private readonly BEARER: string = 'Bearer';

  get accessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) || '';
  }

  set accessToken(tokenValue: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, `${this.BEARER} ${tokenValue}`);
  }

  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión. El token es guardado en localStorage como efecto secundario.
   * @param data
   */
  login(data: LoginRequest): Observable<LoginResponse> {
    const url = environment.api + '/auth/login';
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const options = { headers };

    return this.http.post<LoginResponse>(url, data, options).pipe(
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
    const url = environment.api + '/auth/register';
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const options = { headers };

    return this.http.post<RegisterResponse>(url, data, options).pipe(
      tap((res: RegisterResponse) => {
        this.accessToken = res.accessToken;
      })
    );
  }

  /**
   * Cierra sesión eliminando todo el localStorage
   */
  logout(): void {
    localStorage.clear();
  }
}
