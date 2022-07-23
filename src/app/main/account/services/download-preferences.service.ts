import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { DownloadPreferences } from '../interfaces/download-preferences.interface';
import { UpdateDownloadPreferences } from '../interfaces/update-download-preferences.interface';

@Injectable({
  providedIn: 'root',
})
export class DownloadPreferencesService {
  static readonly ME_PREFERENCES_URL = `${environment.ppgApi.meDownloadPreferences}`;

  constructor(private readonly http: HttpClient) {}

  get() {
    return this.http.get<ApiResponse<DownloadPreferences>>(
      DownloadPreferencesService.ME_PREFERENCES_URL
    );
  }

  patch(updateDownloadPreferences: UpdateDownloadPreferences) {
    return this.http.patch<ApiResponse<UpdateDownloadPreferences>>(
      DownloadPreferencesService.ME_PREFERENCES_URL,
      updateDownloadPreferences
    );
  }
}
