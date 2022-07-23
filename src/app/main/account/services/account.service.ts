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
  static readonly ACCOUNT_URL = `${environment.ppgApi.account}`;
  static readonly UPDATE_PASSWORD_URL = `${environment.ppgApi.updatePassword}`;
  static readonly RECOVER_PASSWORD_URL = `${environment.ppgApi.recoverPassword}`;
  static readonly RESET_PASSWORD_URL = `${environment.ppgApi.resetPassword}`;
  static readonly VALIDATE_RESET_PASSWORD_URL = `${environment.ppgApi.validateResetPassword}`;

  private _sidenavOpened: boolean = true;

  constructor(private http: HttpClient) {}

  get sidenavOpened() {
    return this._sidenavOpened;
  }

  /**
   * @returns los datos del usuario autenticado.
   */
  getAccount(): Observable<ApiResponse<Account>> {
    const url = AccountService.ACCOUNT_URL;
    return this.http.get<ApiResponse<Account>>(url);
  }

  updateAccount(body: UpdateAccount) {
    const url = AccountService.ACCOUNT_URL;
    return this.http.patch<ApiResponse>(url, body);
  }

  updatePassword(body: UpdatePasswordRequest) {
    const url = AccountService.UPDATE_PASSWORD_URL;
    return this.http.patch<ApiResponse>(url, body);
  }

  recoverPassword(body: RecoverPasswordRequest) {
    const url = AccountService.RECOVER_PASSWORD_URL;
    return this.http.post<ApiResponse>(url, body);
  }

  resetPassword(body: ResetPasswordRequest) {
    const url = AccountService.RESET_PASSWORD_URL;
    return this.http.post<ApiResponse>(url, body);
  }

  validateResetPasswordToken(body: ValidateResetPasswordToken) {
    const url = AccountService.VALIDATE_RESET_PASSWORD_URL;
    return this.http.post<ApiResponse>(url, body);
  }

  toggleSidenav() {
    this._sidenavOpened = !this._sidenavOpened;
  }
}
