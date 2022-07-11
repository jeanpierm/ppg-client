import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedQueryKeys } from '../../core/enums/paginated-query-params.enum';
import {
  PaginatedApiResponse,
  ApiResponse,
} from '../../core/models/api-response.model';
import { PaginatedApiQueryParams } from '../../core/models/paginated-api-query-params.interface';
import { Technology } from '../interfaces/technology.interface';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  static readonly BASE_URL = 'technologies';

  fetchLoading: boolean = true;
  technologies: Array<Technology> = [];
  resultsLength = 0;

  constructor(private http: HttpClient) {}

  loadTechnologies(params: PaginatedApiQueryParams): void {
    if (!this.fetchLoading) this.fetchLoading = true;

    this.getTechnologies(params).subscribe((res) => {
      this.technologies = res.data;
      this.resultsLength = res.totalItems;
      this.fetchLoading = false;
    });
  }

  getTechnologies({ size, page, search }: PaginatedApiQueryParams) {
    const url = new URL(`${environment.api}/${TechnologiesService.BASE_URL}`);
    if (size) {
      url.searchParams.set(PaginatedQueryKeys.Size, size.toString());
    }
    if (page) {
      url.searchParams.set(PaginatedQueryKeys.Page, page.toString());
    }
    if (search) {
      url.searchParams.set(PaginatedQueryKeys.Search, search);
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
