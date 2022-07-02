import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Account } from '../../../admin/interfaces/account.interface';
import { UpdatePasswordRequest } from '../interfaces/update-password-request.interface';
import { UpdateAccount } from '../interfaces/update-account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  static readonly BASE_URL = 'account';
  private _sidenavOpened: boolean = true;

  constructor(private http: HttpClient) {}

  get sidenavOpened() {
    return this._sidenavOpened;
  }

  /**
   * @returns los datos del usuario autenticado.
   */
  getAccount(): Observable<ApiResponse<Account>> {
    let url = `${environment.api}/${AccountService.BASE_URL}`;
    return this.http.get<ApiResponse<Account>>(url);
  }

  updateAccount(updateAccount: UpdateAccount) {
    let url = `${environment.api}/${AccountService.BASE_URL}`;
    return this.http.patch<ApiResponse>(url, updateAccount);
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest) {
    let url = `${environment.api}/${AccountService.BASE_URL}/password`;
    return this.http.patch<ApiResponse>(url, updatePasswordRequest);
  }

  toggleSidenav() {
    this._sidenavOpened = !this._sidenavOpened;
  }
}
