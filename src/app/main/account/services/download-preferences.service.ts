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
  readonly meUrl = `${environment.api}${environment.meDownloadPreferencesPath}`;

  constructor(private readonly http: HttpClient) {}

  get() {
    return this.http.get<ApiResponse<DownloadPreferences>>(this.meUrl);
  }

  patch(updateDownloadPreferences: UpdateDownloadPreferences) {
    return this.http.patch<ApiResponse<UpdateDownloadPreferences>>(
      this.meUrl,
      updateDownloadPreferences
    );
  }
}
