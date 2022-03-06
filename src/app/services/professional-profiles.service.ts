import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
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
export class ProfessionalProfilesService {
  responseConfig: ResponseConfig;
  professionalProfiles: ProfessionalProfile[] = [];
  fetchLoading: boolean = true;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.responseConfig = new ResponseConfig();
  }

  generate(
    data: GeneratePpgRequest
  ): Observable<ApiResponse<ProfessionalProfile>> {
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

  loadProfessionalProfiles(
    initDate?: Date,
    endDate?: Date,
    jobTitle?: string,
    location?: string
  ): void {
    !this.fetchLoading && (this.fetchLoading = true);
    this.getProfessionalProfiles(
      initDate,
      endDate,
      jobTitle,
      location
    ).subscribe((res) => {
      this.professionalProfiles = res.data;
      this.fetchLoading = false;
    });
  }

  getProfessionalProfiles(
    initDate?: Date,
    endDate?: Date,
    jobTitle?: string,
    location?: string
  ): Observable<ApiResponse<ProfessionalProfile[]>> {
    const url = environment.api + '/professional-profiles';
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    let params = new HttpParams();
    if (initDate) {
      params = params.set('initDate', initDate.toDateString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toDateString());
    }
    if (jobTitle) {
      params = params.set('jobTitle', jobTitle);
    }
    if (location) {
      params = params.set('location', location);
    }
    const options = { headers, params };
    return this.http.get<ApiResponse<ProfessionalProfile[]>>(url, options).pipe(
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
