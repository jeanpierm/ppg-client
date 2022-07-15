import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedQueryKeys } from '../../core/enums/paginated-query-params.enum';
import { PaginatedApiResponse } from '../../core/models/api-response.model';
import { PaginatedApiQueryParams } from '../../core/models/paginated-api-query-params.interface';
import { TechType } from '../interfaces/tech-type.interface';

@Injectable({
  providedIn: 'root',
})
export class TechTypesService {
  static readonly baseUrl = `${environment.api}${environment.techTypesPath}`;
  constructor(private http: HttpClient) {}

  getTechTypes({ size, page, search }: PaginatedApiQueryParams) {
    const url = new URL(TechTypesService.baseUrl);
    if (size) url.searchParams.set(PaginatedQueryKeys.Size, size.toString());
    if (page) url.searchParams.set(PaginatedQueryKeys.Page, page.toString());
    if (search) url.searchParams.set(PaginatedQueryKeys.Search, search);

    return this.http.get<PaginatedApiResponse<TechType>>(url.toString());
  }

  getTechTypeNames() {
    return this.getTechTypes({}).pipe(
      map((res) => res.data.map((type) => type.name))
    );
  }
}
