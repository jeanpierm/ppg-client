import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedQueryKeys } from '../../core/enums/paginated-query-params.enum';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '../../core/models/api-response.model';
import { PaginatedApiQueryParams } from '../../core/models/paginated-api-query-params.interface';
import { GetTechTypeQuery } from '../interfaces/get-tech-type-query.interface';
import { TechType } from '../interfaces/tech-type.interface';

@Injectable({
  providedIn: 'root',
})
export class TechTypesService {
  static readonly baseUrl = `${environment.api}${environment.techTypesPath}`;
  techTypes: TechType[] = [];
  fetchLoading: boolean = true;
  resultsLength = 0;

  constructor(private http: HttpClient) {}

  loadTechTypes(params: PaginatedApiQueryParams & GetTechTypeQuery) {
    if (!this.fetchLoading) this.fetchLoading = true;
    this.getTechTypes(params).subscribe({
      next: (res) => {
        this.techTypes = res.data;
        this.resultsLength = res.totalItems;
        this.fetchLoading = false;
      },
    });
  }

  getTechTypes({
    size,
    page,
    search,
    status,
  }: PaginatedApiQueryParams & GetTechTypeQuery) {
    const url = new URL(TechTypesService.baseUrl);
    if (size) url.searchParams.set(PaginatedQueryKeys.Size, size.toString());
    if (page) url.searchParams.set(PaginatedQueryKeys.Page, page.toString());
    if (search) url.searchParams.set(PaginatedQueryKeys.Search, search);
    if (status) url.searchParams.set('status', status);
    return this.http.get<PaginatedApiResponse<TechType>>(url.toString());
  }

  getTechTypeNames() {
    return this.getTechTypes({}).pipe(
      map((res) => res.data.map((type) => type.name))
    );
  }

  saveTechType(techType: TechType) {
    const url = new URL(TechTypesService.baseUrl);
    return this.http.post<ApiResponse>(url.toString(), techType);
  }

  updateTechType(techTypeId: string, techType: TechType) {
    const url = new URL(`${TechTypesService.baseUrl}/${techTypeId}`);
    return this.http.patch<ApiResponse>(url.toString(), techType);
  }

  deleteTechType(techTypeId: string) {
    const url = new URL(`${TechTypesService.baseUrl}/${techTypeId}`);
    return this.http.delete<ApiResponse>(url.toString());
  }
}
