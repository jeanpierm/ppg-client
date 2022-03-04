import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseConfig } from '../config/response-config';
import { GeneratePpg } from '../models/generate-ppg';
import { ApiResponse } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfileService {
  private _token: any;
  private _user: any;
  public responseConfig: ResponseConfig;

  constructor(private http: HttpClient) {
    this._token = localStorage.getItem('token');
    this._user = localStorage.getItem('currentUser');
    this.responseConfig = new ResponseConfig();
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
        throw this.responseConfig.handleError(err);
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
        throw this.responseConfig.handleError(err);
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
        throw this.responseConfig.handleError(err);
      })
    );
  }
}
