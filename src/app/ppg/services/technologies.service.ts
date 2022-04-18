import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { environment } from 'src/environments/environment';
import { ResponseConfig } from '../config/response-config';
import { Technology } from '../models/technologies/technology';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  responseConfig: ResponseConfig;
  fetchLoading: boolean = true;
  public technologies: Array<Technology>;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.responseConfig = new ResponseConfig();
    this.technologies = [];
  }

  loadProfessionalProfiles(): void {
    !this.fetchLoading && (this.fetchLoading = true);
    this.getTecnologies().subscribe((res) => {
      this.technologies = res.data;
      this.fetchLoading = false;
    });
  }

  getTecnologies(): Observable<ApiResponse<Technology[]>> {
    const url = environment.api + '/technologies';
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<ApiResponse<Technology[]>>(url, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }
}
