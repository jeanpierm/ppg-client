import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfessionalProfile } from '../../account/interfaces/professional-profile.interface';
import { ApiResponse } from '../../../core/models/api-response.model';
import { CountTechnologyQuery } from '../../../core/types/count-technology-query.type';
import { GeneratePPRequest } from '../../account/interfaces/generate-pp.interface';
import { GetProfessionalProfilesQuery } from '../../account/interfaces/get-professional-profiles-query.interface';
import { PaginatedApiQueryParams } from '../../../core/models/paginated-api-query-params.interface';
import { PaginatedQueryKeys } from '../../../core/enums/paginated-query-params.enum';
import { ProfilesQueryKeys } from '../enums/profiles-query-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  static readonly BASE_URL = 'professional-profiles';
  /**
   * Tiempo de enfriamiento en milisegundos para la generación de perfil. Es necesario para evitar que la página a la que se le hace el web scraping nos bloquee, debido al gran número de peticiones que se hace en poco tiempo.
   * 30000 = 30s
   */
  static readonly GENERATE_COOLDOWN_TIME = 30000;

  lastProfileGeneration?: Date;

  constructor(private readonly http: HttpClient) {}

  generate(
    data: GeneratePPRequest
  ): Observable<ApiResponse<ProfessionalProfile>> {
    const url = `${environment.api}/${ProfilesService.BASE_URL}`;
    return this.http
      .post<ApiResponse<ProfessionalProfile>>(url, data)
      .pipe(tap(() => (this.lastProfileGeneration = new Date())));
  }

  get(
    getProfessionalProfilesQuery?: GetProfessionalProfilesQuery &
      PaginatedApiQueryParams
  ): Observable<ApiResponse<ProfessionalProfile[]>> {
    const {
      initDate,
      endDate,
      jobTitle,
      location,
      page: pageIndex,
      size: sizePerPage,
    } = getProfessionalProfilesQuery || {};
    const url = new URL(`${environment.api}/${ProfilesService.BASE_URL}`);

    if (initDate) {
      url.searchParams.set(ProfilesQueryKeys.InitDate, initDate);
    }
    if (endDate) {
      url.searchParams.set(ProfilesQueryKeys.EndDate, endDate);
    }
    if (jobTitle) {
      url.searchParams.set(ProfilesQueryKeys.JobTitle, jobTitle);
    }
    if (location) {
      url.searchParams.set(ProfilesQueryKeys.Location, location);
    }
    if (pageIndex) {
      url.searchParams.set(PaginatedQueryKeys.Page, pageIndex.toString());
    }
    if (sizePerPage) {
      url.searchParams.set(PaginatedQueryKeys.Size, sizePerPage.toString());
    }

    return this.http.get<ApiResponse<ProfessionalProfile[]>>(url.toString());
  }

  getRadom(): Observable<ApiResponse<ProfessionalProfile>> {
    const url = `${environment.api}/${ProfilesService.BASE_URL}/random`;
    return this.http.get<ApiResponse<ProfessionalProfile>>(url);
  }

  download(id: string) {
    const url = `${environment.api}/download/${id}`;
    const headers = new HttpHeaders().set('Accept', 'application/pdf');

    return this.http.get(url, { headers, responseType: 'blob' });
  }

  getById(id: string) {
    const url = `${environment.api}/${ProfilesService.BASE_URL}/${id}`;
    return this.http.get<ApiResponse<ProfessionalProfile>>(url);
  }

  count(query: CountTechnologyQuery) {
    const url = new URL(`${environment.api}/${ProfilesService.BASE_URL}/count`);
    url.searchParams.set(ProfilesQueryKeys.Query, query);
    return this.http.get<ApiResponse<Record<string, number>>>(url.toString());
  }

  delete(ppId: String) {
    const url = `${environment.api}/${ProfilesService.BASE_URL}/${ppId}`;
    return this.http.delete<ApiResponse>(url);
  }
}
