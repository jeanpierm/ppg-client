import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordConfig } from '../../core/config/password.config';
import { AlertService } from '../../core/services/alert.service';
import { RoutesService } from '../../core/services/routes.service';
import {
  getPasswordValidationMessage,
  validateTwoFormControlsAreEquals,
} from '../../core/utils/form.util';
import { RecoverPasswordRequest } from '../account/interfaces/recover-password-request.interface';
import { ResetPasswordRequest } from '../account/interfaces/reset-password-request.interface';
import { ValidateResetPasswordToken } from '../account/interfaces/validate-reset-pass-token.interface';
import { AccountService } from '../account/services/account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  static readonly PATH = 'password-reset';

  recoverForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  resetForm: FormGroup = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(PasswordConfig.minLength),
          Validators.maxLength(PasswordConfig.maxLength),
          Validators.pattern(PasswordConfig.regex),
        ],
      ],
      password2: ['', Validators.required],
    },
    {
      validators: [validateTwoFormControlsAreEquals('password', 'password2')],
    }
  );
  loading: boolean = false;
  isRecoverRequested: boolean = false;
  token: string = '';
  userId: string = '';
  hidePass: boolean = true;
  hidePass2: boolean = true;
  isResetTokenValid: boolean = false;
  submittingReset: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly alertService: AlertService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public readonly routes: RoutesService
  ) {
    this.loadResetParams();
    if (this.hasParamsToReset) {
      this.validateResetPasswordToken();
    }
  }

  get email() {
    return this.recoverForm.get('email');
  }

  get password() {
    return this.resetForm.get('password');
  }

  get password2() {
    return this.resetForm.get('password2');
  }

  get hasParamsToReset() {
    return !!this.token && !!this.userId;
  }

  loadResetParams() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.token = params['token'];
        this.userId = params['id'];
      },
    });
  }

  validateResetPasswordToken() {
    const request: ValidateResetPasswordToken = {
      token: this.token,
      userId: this.userId,
    };
    this.accountService.validateResetPasswordToken(request).subscribe({
      next: () => {
        this.isResetTokenValid = true;
      },
      error: (err) => {
        this.isResetTokenValid = false;
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          this.alertService.error(resetErrors[err.status]);
        }
      },
    });
  }

  recoverPassword() {
    if (this.recoverForm.invalid) return;

    this.isRecoverRequested = true;
    this.email?.disable();
    const request: RecoverPasswordRequest = { email: this.email?.value };
    this.accountService.recoverPassword(request).subscribe({
      next: () => {
        this.alertService.success({
          title: 'Revisa tu bandeja de entrada',
          html: `Te hemos enviado un correo a <b>${request.email}</b> con las instrucciones para cambiar tu contraseña.
          <br/>
          <br/>
          <small>*Si no logras encontrarlo, revisa tu bandeja de spam.</small>`,
        });
      },
      error: (err) => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          this.alertService.error(recoverErrors[err.status]);
        }
      },
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) return;
    this.submittingReset = true;
    const request: ResetPasswordRequest = {
      token: this.token,
      userId: this.userId,
      newPassword: this.password?.value,
    };
    this.accountService.resetPassword(request).subscribe({
      next: () => {
        this.submittingReset = false;
        this.alertService
          .success({ title: '¡Nueva contraseña establecida con éxito!' })
          .then(() => this.router.navigateByUrl(this.routes.loginRoute));
      },
      error: (err) => {
        this.submittingReset = false;
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          this.alertService.error(resetErrors[err.status]);
        }
      },
    });
  }

  getPasswordValidationMsg(password: string): string | void {
    return getPasswordValidationMessage(password);
  }
}

const resetErrors = {
  400: {
    title:
      'El enlace para restablecer la contraseña es inválido, ha expirado o ya ha sido utilizado.',
    text: 'Por favor, vuelve a restablecer tu contraseña.',
  },
};

const recoverErrors = {
  404: {
    title: 'No se encontró su cuenta',
    text: 'Puede registrarse dando click en "Crear cuenta".',
  },
};
