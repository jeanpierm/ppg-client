import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedQueryKeys } from '../../core/enums/paginated-query-params.enum';
import {
  PaginatedApiResponse,
  ApiResponse,
} from '../../core/models/api-response.model';
import { PaginatedApiQuery } from '../../core/models/paginated-api-query.interface';
import { CourseInterface } from '../interfaces/course.interface';
import { CreateTechnology } from '../interfaces/create-technology.interface';
import { Technology } from '../interfaces/technology.interface';
import { UpdateTechnology } from '../interfaces/update-technology.interface';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  static readonly TECHNOLOGIES_URL = environment.ppgApi.technologies;

  fetchLoading: boolean = true;
  technologies: Array<Technology> = [];
  resultsLength = 0;

  constructor(private http: HttpClient) {}

  loadTechnologies(params: PaginatedApiQuery): void {
    if (!this.fetchLoading) this.fetchLoading = true;

    this.getTechnologies(params).subscribe((res) => {
      this.technologies = res.data;
      this.resultsLength = res.totalItems;
      this.fetchLoading = false;
    });
  }

  getTechnologies({ size, page, search }: PaginatedApiQuery) {
    const url = new URL(TechnologiesService.TECHNOLOGIES_URL);
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

  getCourses(courseName: string) {
    const url = `${TechnologiesService.TECHNOLOGIES_URL}/search?course=${courseName}`;
    return this.http.get<ApiResponse<CourseInterface[]>>(url);
  }

  createTechnology(technology: CreateTechnology) {
    const url = `${TechnologiesService.TECHNOLOGIES_URL}`;
    return this.http.post<ApiResponse>(url, technology);
  }

  updateTechnology(technologyId: string, technology: UpdateTechnology) {
    const url = `${TechnologiesService.TECHNOLOGIES_URL}/${technologyId}`;
    return this.http.patch<ApiResponse>(url, technology);
  }

  deleteTechnology(technologyId: string) {
    const url = `${TechnologiesService.TECHNOLOGIES_URL}/${technologyId}`;
    return this.http.delete(url);
  }
}
