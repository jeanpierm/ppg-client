import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneratePpg } from '../models/generate-ppg';
import { ApiResponse } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfileService {
  private _token: any;
  private _user: any;

  constructor(private http: HttpClient) {
    this._token = localStorage.getItem('token');
    this._user = localStorage.getItem('currentUser');
  }

  generate(parametros: GeneratePpg) {
    this._token = localStorage.getItem('token');
    let url = environment.api + '/professional-profiles';
    let params = parametros;
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this._token}`,
    });
    let options = { headers: header };
    return this.http.post<ApiResponse>(url, params, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        throw this.handleError(err);
      })
    );
  }

  getProfessionalProfile() {
    this._token = localStorage.getItem('token');
    let url = environment.api + '/professional-profiles';
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this._token}`,
    });
    let options = { headers: header };

    return this.http.get<ApiResponse>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.handleError(err);
      })
    );
  }

  getRadomProfile() {
    let url = environment.api + '/professional-profiles/random';
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this._token}`,
    });
    let options = { headers: header };

    return this.http.get<ApiResponse>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.handleError(err);
      })
    );
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
