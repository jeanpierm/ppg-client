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
  public resultsLength = 0;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.responseConfig = new ResponseConfig();
    this.technologies = [];
  }

  loadTechnology(
    sizePerPage: Number,
    pageIndex?: number,
    search?: String
  ): void {
    !this.fetchLoading && (this.fetchLoading = true);

    let qs = `?size=${sizePerPage}`;
    if (pageIndex) {
      qs += `&page=${pageIndex + 1}`;
    }

    if (search) {
      qs += `&search=${search}`;
    }

    this.getTecnologies(qs).subscribe((res) => {
      this.technologies = res.data;
      this.resultsLength = res.totalItems;
      this.fetchLoading = false;
    });
  }

  getTecnologies(queryString: String = ''): Observable<any> {
    //const url = environment.api + '/technologies';
    const url = `${environment.api}/technologies${queryString}`;
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.get<any>(url, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  saveTechnology(technology: Technology) {
    const url = environment.api + '/technologies';
    const body = technology;
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const option = { headers: header };

    return this.http.post<ApiResponse>(url, body, option).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  updateTechnology(technology: Technology) {
    const url = `${environment.api}/technologies/${technology.technologyId}`;
    const body = technology;
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const options = { headers: header };

    return this.http.patch<ApiResponse>(url, body, options).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }

  // loadDeleteTechnology(technologyId: String) {
  //   this.fetchLoading = true;
  //   this.deleteTechnology(technologyId).subscribe((res) => {
  //     //this.loadTechnology();
  //   });
  // }

  deleteTechnology(technologyId: String) {
    const url = environment.api + '/technologies/' + technologyId;
    const header = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.accessToken,
    });
    const option = { headers: header };

    return this.http.delete(url, option).pipe(
      catchError((err) => {
        throw this.responseConfig.handleError(err);
      })
    );
  }
}
