import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfessionalProfile } from '../interfaces/professional-profile.interface';
import { ApiResponse } from '../../../core/models/api-response.model';
import { CountTechnologyQuery } from '../../../core/types/count-technology-query.type';
import { GeneratePPRequest } from '../interfaces/generate-pp.interface';
import { GetProfessionalProfilesQuery } from '../interfaces/get-professional-profiles-query.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfilesService {
  static readonly BASE_URL = 'professional-profiles';

  private readonly QUERY_COUNT_KEY = 'q';
  private readonly INIT_DATE_KEY = 'initDate';
  private readonly END_DATE_KEY = 'endDate';
  private readonly JOB_TITLE_KEY = 'jobTitle';
  private readonly LOCATION_KEY = 'location';

  /**
   * Tiempo de enfriamiento en milisegundos para la generación de perfil. Es necesario para evitar bloqueos de la página web en el proceso de scraping.
   * 30000 = 30s
   */
  readonly GENERATE_COOLDOWN_TIME = 30000;

  professionalProfiles: ProfessionalProfile[] = [];
  fetchLoading: boolean = true;
  lastProfileGeneration?: Date;

  constructor(private readonly http: HttpClient) {}

  generate(
    data: GeneratePPRequest
  ): Observable<ApiResponse<ProfessionalProfile>> {
    const url = `${environment.api}/${ProfessionalProfilesService.BASE_URL}`;
    return this.http
      .post<ApiResponse<ProfessionalProfile>>(url, data)
      .pipe(tap(() => (this.lastProfileGeneration = new Date())));
  }

  loadProfessionalProfiles(
    getProfessionalProfilesQuery?: GetProfessionalProfilesQuery
  ): void {
    if (!this.fetchLoading) {
      this.fetchLoading = true;
    }
    this.get(getProfessionalProfilesQuery).subscribe((res) => {
      this.professionalProfiles = res.data;
      this.fetchLoading = false;
    });
  }

  get(
    getProfessionalProfilesQuery?: GetProfessionalProfilesQuery
  ): Observable<ApiResponse<ProfessionalProfile[]>> {
    const { initDate, endDate, jobTitle, location } =
      getProfessionalProfilesQuery || {};
    const url = new URL(
      `${environment.api}/${ProfessionalProfilesService.BASE_URL}`
    );

    if (initDate) {
      url.searchParams.set(this.INIT_DATE_KEY, initDate);
    }
    if (endDate) {
      url.searchParams.set(this.END_DATE_KEY, endDate);
    }
    if (jobTitle) {
      url.searchParams.set(this.JOB_TITLE_KEY, jobTitle);
    }
    if (location) {
      url.searchParams.set(this.LOCATION_KEY, location);
    }

    return this.http.get<ApiResponse<ProfessionalProfile[]>>(url.toString());
  }

  getRadom(): Observable<ApiResponse<ProfessionalProfile>> {
    const url = `${environment.api}/${ProfessionalProfilesService.BASE_URL}/random`;
    return this.http.get<ApiResponse<ProfessionalProfile>>(url);
  }

  getById(id: string) {
    const url = `${environment.api}/${ProfessionalProfilesService.BASE_URL}/${id}`;
    return this.http.get<ApiResponse<ProfessionalProfile>>(url);
  }

  count(query: CountTechnologyQuery) {
    const url = new URL(
      `${environment.api}/${ProfessionalProfilesService.BASE_URL}/count`
    );
    url.searchParams.set(this.QUERY_COUNT_KEY, query);
    return this.http.get<ApiResponse<Record<string, number>>>(url.toString());
  }

  delete(ppId: String) {
    const url = `${environment.api}/${ProfessionalProfilesService.BASE_URL}/${ppId}`;
    return this.http.delete<ApiResponse>(url);
  }
}
