import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedQueryKeys } from '../../core/enums/paginated-query-params.enum';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '../../core/models/api-response.model';
import { PaginatedApiQuery } from '../../core/models/paginated-api-query.interface';
import { GetTechTypeParams } from '../interfaces/get-tech-type-params.interface';
import { TechType } from '../interfaces/tech-type.interface';

@Injectable({
  providedIn: 'root',
})
export class TechTypesService {
  static readonly TECH_TYPES_URL: string = environment.ppgApi.techTypes;

  techTypes: TechType[] = [];
  fetchLoading: boolean = true;
  resultsLength = 0;

  constructor(private http: HttpClient) {}

  loadTechTypes(params: PaginatedApiQuery & GetTechTypeParams) {
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
  }: PaginatedApiQuery & GetTechTypeParams = {}) {
    const url = new URL(TechTypesService.TECH_TYPES_URL);
    if (size) url.searchParams.set(PaginatedQueryKeys.Size, size.toString());
    if (page) url.searchParams.set(PaginatedQueryKeys.Page, page.toString());
    if (search) url.searchParams.set(PaginatedQueryKeys.Search, search);
    if (status) url.searchParams.set('status', status);
    return this.http.get<PaginatedApiResponse<TechType>>(url.toString());
  }

  getTechTypeNames(params?: PaginatedApiQuery & GetTechTypeParams) {
    return this.getTechTypes(params).pipe(
      map(({ data }) => data.map(({ name }) => name))
    );
  }

  saveTechType(techType: TechType) {
    const url = new URL(TechTypesService.TECH_TYPES_URL);
    return this.http.post<ApiResponse>(url.toString(), techType);
  }

  updateTechType(techTypeId: string, techType: Partial<TechType>) {
    const url = new URL(`${TechTypesService.TECH_TYPES_URL}/${techTypeId}`);
    return this.http.patch<ApiResponse>(url.toString(), techType);
  }

  deleteTechType(techTypeId: string) {
    const url = new URL(`${TechTypesService.TECH_TYPES_URL}/${techTypeId}`);
    return this.http.delete<ApiResponse>(url.toString());
  }
}
