import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { User } from '../../users/interfaces/user';
import { Account } from '../../users/interfaces/account.interface';
import { UpdatePasswordRequest } from '../interfaces/update-password-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  static readonly BASE_URL = 'account';

  constructor(private http: HttpClient) {}

  /**
   * @returns los datos del usuario autenticado.
   */
  getAccount(): Observable<ApiResponse<Account>> {
    let url = `${environment.api}/${AccountService.BASE_URL}`;
    return this.http.get<ApiResponse<Account>>(url);
  }

  updateAccount(user: User) {
    let url = `${environment.api}/${AccountService.BASE_URL}`;
    return this.http.patch<ApiResponse>(url, user);
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest) {
    let url = `${environment.api}/${AccountService.BASE_URL}/password`;
    return this.http.patch<ApiResponse>(url, updatePasswordRequest);
  }
}
