import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CloudinaryUploadResponse } from '../models/cloudinary-upload-response.model';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Sube un archivo, generalmente de tipo imagen, a la nube de cloudinary.
   * @param file
   * @returns un observador que devuelve el URL de la imagen que se ha subido.
   */
  uploadFile(file: File): Observable<string> {
    const url = `${environment.cloudinaryApi}/jean-cloudinary/upload`;
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('upload_preset', 'ppg-ug');
    return this.http
      .post<CloudinaryUploadResponse>(url, formData)
      .pipe(map((res) => res.secure_url));
  }
}
