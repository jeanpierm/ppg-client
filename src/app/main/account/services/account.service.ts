import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Account } from '../../../admin/interfaces/account.interface';
import { UpdatePasswordRequest } from '../interfaces/update-password-request.interface';
import { UpdateAccount } from '../interfaces/update-account.interface';
import { RecoverPasswordRequest } from '../interfaces/recover-password-request.interface';
import { ResetPasswordRequest } from '../interfaces/reset-password-request.interface';
import { ValidateResetPasswordToken } from '../interfaces/validate-reset-pass-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  static readonly BASE_URL = 'account';
  private _sidenavOpened: boolean = true;
  private readonly accountUrl = `${environment.api}${environment.accountPath}`;
  private readonly updatePasswordUrl = `${environment.api}${environment.updatePasswordPath}`;
  private readonly recoverPasswordUrl = `${environment.api}${environment.recoverPasswordPath}`;
  private readonly resetPasswordUrl = `${environment.api}${environment.resetPasswordPath}`;
  private readonly validateResetPassTokenUrl = `${environment.api}${environment.validateResetPasswordTokenPath}`;

  constructor(private http: HttpClient) {}

  get sidenavOpened() {
    return this._sidenavOpened;
  }

  /**
   * @returns los datos del usuario autenticado.
   */
  getAccount(): Observable<ApiResponse<Account>> {
    const url = this.accountUrl;
    return this.http.get<ApiResponse<Account>>(url);
  }

  updateAccount(body: UpdateAccount) {
    const url = this.accountUrl;
    return this.http.patch<ApiResponse>(url, body);
  }

  updatePassword(body: UpdatePasswordRequest) {
    const url = this.updatePasswordUrl;
    return this.http.patch<ApiResponse>(url, body);
  }

  recoverPassword(body: RecoverPasswordRequest) {
    const url = this.recoverPasswordUrl;
    return this.http.post<ApiResponse>(url, body);
  }

  resetPassword(body: ResetPasswordRequest) {
    const url = this.resetPasswordUrl;
    return this.http.post<ApiResponse>(url, body);
  }

  validateResetPasswordToken(body: ValidateResetPasswordToken) {
    const url = this.validateResetPassTokenUrl;
    return this.http.post<ApiResponse>(url, body);
  }

  toggleSidenav() {
    this._sidenavOpened = !this._sidenavOpened;
  }
}
