import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '../../../core/models/api-response.model';
import { PaginatedApiQueryParams } from '../../../core/models/paginated-api-query-params.interface';
import { Technology } from '../interfaces/technology.interface';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  static readonly BASE_URL = 'technologies';

  fetchLoading: boolean = true;
  technologies: Array<Technology>;
  resultsLength = 0;

  constructor(private http: HttpClient) {
    this.technologies = [];
  }

  loadTechnology(params: PaginatedApiQueryParams): void {
    if (!this.fetchLoading) this.fetchLoading = true;

    this.getTechnologies(params).subscribe((res) => {
      this.technologies = res.data;
      this.resultsLength = res.totalItems;
      this.fetchLoading = false;
    });
  }

  getTechnologies({ sizePerPage, pageIndex, search }: PaginatedApiQueryParams) {
    const url = new URL(`${environment.api}/${TechnologiesService.BASE_URL}`);
    url.searchParams.set('size', sizePerPage.toString());
    if (pageIndex) {
      url.searchParams.set('page', pageIndex.toString());
    }
    if (search) {
      url.searchParams.set('search', search);
    }

    return this.http.get<PaginatedApiResponse<Technology>>(url.toString());
  }

  saveTechnology(technology: Technology) {
    const url = `${environment.api}/${TechnologiesService.BASE_URL}`;
    return this.http.post<ApiResponse>(url, technology);
  }

  updateTechnology(technology: Technology) {
    const url = `${environment.api}/${TechnologiesService.BASE_URL}/${technology.technologyId}`;
    return this.http.patch<ApiResponse>(url, technology);
  }

  deleteTechnology(technologyId: string) {
    const url = `${environment.api}/${TechnologiesService.BASE_URL}/${technologyId}`;
    return this.http.delete(url);
  }
}
