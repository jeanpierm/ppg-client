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
import { GeneratePpgRequest } from '../models/profiles/generate-ppg';
import { ProfessionalProfile } from '../models/profiles/professional-profile';
import { ApiResponse } from '../../shared/models/api-response';
import { AuthService } from '../../auth/services/auth.service';
import { SweetAlert } from '../config/sweetAlert';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfilesService {
  responseConfig: ResponseConfig;
  professionalProfiles: ProfessionalProfile[] = [];
  ppGenerated: ProfessionalProfile = new ProfessionalProfile();
  fetchLoading: boolean = true;
  public alert: SweetAlert = new SweetAlert();
  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.responseConfig = new ResponseConfig();
  }

  loadGenerate(data: GeneratePpgRequest): void {
    !this.fetchLoading && (this.fetchLoading = true);
    this.generate(data).subscribe({
      next: (res) => {
        this.fetchLoading = false;
        this.ppGenerated = res.data;
        this.alert.successAlert('Perfil profesional generado correctamente');
      },
      error: (err) => {
        this.fetchLoading = false;
        this.alert.errorAlert(err);
      },
    });
  }

  generate(
    data: GeneratePpgRequest
  ): Observable<ApiResponse<ProfessionalProfile>> {
    const url = environment.api + '/professional-profiles';
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };
    return this.http
      .post<ApiResponse<ProfessionalProfile>>(url, data, options)
      .pipe(
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
    const url = environment.api + '/professional-profiles/random';
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<ApiResponse<ProfessionalProfile>>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  getFrameworks(): Observable<ApiResponse> {
    const url = environment.api + '/professional-profiles/frameworks/count';
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<ApiResponse>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  getLenguages(): Observable<ApiResponse> {
    const url = environment.api + '/professional-profiles/languages/count';
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<ApiResponse>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  getDataBases(): Observable<ApiResponse> {
    const url = environment.api + '/professional-profiles/databases/count';
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<ApiResponse>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  getTools(): Observable<ApiResponse> {
    const url = environment.api + '/professional-profiles/tools/count';
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<ApiResponse>(url, options).pipe(
      map((res) => res),
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  delete(ppId: String) {
    const url = `${environment.api}/professional-profiles/${ppId}`;
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
}
