import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import {
  getPasswordValidationMessage,
  validateTwoFormControlsAreEquals,
} from '../../../../core/utils/form.util';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  static readonly PATH = 'change-password';

  hideCurrent: boolean = true;
  hideNew: boolean = true;
  hideNew2: boolean = true;
  submitting: boolean = false;
  form: FormGroup = this.fb.group(
    {
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&.])([A-Za-z\d#@$!%*?&.]|[^ ])/
          ),
        ],
      ],
      newPassword2: ['', [Validators.required]],
    },
    {
      validators: [
        validateTwoFormControlsAreEquals('newPassword', 'newPassword2'),
      ],
    }
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly alertService: AlertService
  ) {}

  get currentPassword() {
    return this.form.get('currentPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get newPassword2() {
    return this.form.get('newPassword2');
  }

  cancel() {
    location.reload();
  }

  getPasswordValidationMsg(): string | void {
    const password = this.form.get('newPassword')?.value;
    if (!password) return;
    return getPasswordValidationMessage(password);
  }

  updatePassword() {
    if (this.form.invalid) return;
    const { currentPassword, newPassword } = this.form.value;
    this.accountService
      .updatePassword({ currentPassword, newPassword })
      .subscribe({
        next: () => {
          this.alertService.success({
            title: 'Contraseña actualizada con éxito',
          });
          this.form.reset();
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            this.alertService.error(passwordErrors[err.status]);
          }
        },
      });
  }
}

const passwordErrors = {
  400: { title: 'La contraseña actual no es correcta' },
};
