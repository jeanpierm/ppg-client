import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseConfig } from '../config/response-config';
import { ProfessionalProfile } from '../models/profiles/professional-profile';
import { ApiResponse } from '../../core/models/api-response.model';
import { AuthService } from '../../auth/services/auth.service';
import { SweetAlert } from '../config/sweetAlert';
import { CountQuery } from '../types/count-query.type';
import { GeneratePpgRequest } from '../interfaces/generate-pp.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfilesService {
  readonly QUERY_COUNT_KEY = 'q';
  readonly INIT_DATE_KEY = 'initDate';
  readonly END_DATE_KEY = 'endDate';
  readonly JOB_TITLE_KEY = 'jobTitle';
  readonly LOCATION_KEY = 'location';

  responseConfig: ResponseConfig = new ResponseConfig();
  professionalProfiles: ProfessionalProfile[] = [];
  httpHeaders: HttpHeaders;

  fetchLoading: boolean = true;
  alert: SweetAlert = new SweetAlert();

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.httpHeaders = new HttpHeaders({
      Authorization: this.authService.accessToken,
    });
  }

  generate(
    data: GeneratePpgRequest
  ): Observable<ApiResponse<ProfessionalProfile>> {
    const url = environment.api + '/professional-profiles';
    return this.http
      .post<ApiResponse<ProfessionalProfile>>(url, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((err) => {
          throw this.responseConfig.handleError(err);
        })
      );
  }

  loadProfessionalProfiles(
    initDate?: Date | string,
    endDate?: Date | string,
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
    initDate?: Date | string,
    endDate?: Date | string,
    jobTitle?: string,
    location?: string
  ): Observable<ApiResponse<ProfessionalProfile[]>> {
    const url = environment.api + '/professional-profiles';

    let params = new HttpParams();
    if (initDate) {
      params = params.set(
        this.INIT_DATE_KEY,
        initDate instanceof Date ? initDate.toISOString() : initDate
      );
    }
    if (endDate) {
      params = params.set(
        this.END_DATE_KEY,
        endDate instanceof Date ? endDate.toISOString() : endDate
      );
    }
    if (jobTitle) {
      params = params.set(this.JOB_TITLE_KEY, jobTitle);
    }
    if (location) {
      params = params.set(this.LOCATION_KEY, location);
    }

    return this.http
      .get<ApiResponse<ProfessionalProfile[]>>(url, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(
        catchError((err) => {
          throw this.responseConfig.handleError(err);
        })
      );
  }

  getRadomProfile(): Observable<ApiResponse<ProfessionalProfile>> {
    const url = environment.api + '/professional-profiles/random';

    return this.http
      .get<ApiResponse<ProfessionalProfile>>(url, { headers: this.httpHeaders })
      .pipe(
        map((res) => res),
        catchError((err) => {
          throw this.responseConfig.handleError(err);
        })
      );
  }

  count(query: CountQuery) {
    const url = new URL(environment.api + '/professional-profiles/count');
    url.searchParams.set(this.QUERY_COUNT_KEY, query);

    return this.http
      .get<ApiResponse<Record<string, number>>>(url.toString(), {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((err) => {
          throw this.responseConfig.handleError(err);
        })
      );
  }

  delete(ppId: String) {
    const url = `${environment.api}/professional-profiles/${ppId}`;

    return this.http
      .delete<ApiResponse>(url, { headers: this.httpHeaders })
      .pipe(
        catchError((err) => {
          throw this.responseConfig.handleError(err);
        })
      );
  }
}
