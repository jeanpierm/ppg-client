import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseConfig } from '../config/response-config';
import { GeneratePpgRequest } from '../models/generate-ppg';
import { ProfessionalProfile } from '../models/professional-profile';
import { ApiResponse } from '../models/response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfileService {
  private _token: any;
  private _user: any;
  public responseConfig: ResponseConfig;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this._token = localStorage.getItem('token');
    this._user = localStorage.getItem('currentUser');
    this.responseConfig = new ResponseConfig();
  }

  generate(
    data: GeneratePpgRequest
  ): Observable<ApiResponse<ProfessionalProfile>> {
    this._token = localStorage.getItem('token');
    let url = environment.api + '/professional-profiles';
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    let options = { headers: header };
    return this.http
      .post<ApiResponse<ProfessionalProfile>>(url, data, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          throw this.responseConfig.handleError(err);
        })
      );
  }

  getProfessionalProfiles(): Observable<ApiResponse<ProfessionalProfile[]>> {
    let url = environment.api + '/professional-profiles';
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    let options = { headers: header };

    return this.http.get<ApiResponse<ProfessionalProfile[]>>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  getRadomProfile(): Observable<ApiResponse<ProfessionalProfile>> {
    let url = environment.api + '/professional-profiles/random';
    let header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    let options = { headers: header };

    return this.http.get<ApiResponse<ProfessionalProfile>>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }
}
