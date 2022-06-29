import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UpdateAccount } from '../../interfaces/update-account.interface';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
  static readonly PATH = 'edit';

  submitting: boolean = false;
  account: UpdateAccount = {
    email: '',
    jobTitle: '',
    location: '',
    name: '',
    surname: '',
    biography: '',
    linkedIn: '',
  };
  form: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
    surname: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService
  ) {}

  cancel() {
    location.reload();
  }

  ngOnInit(): void {
    this.setAccountDataInForm();
  }

  async setAccountDataInForm() {
    const { name, surname, email } = this.authService.authAccount;
    this.form.setValue({ name, surname, email });
  }

  validErrorForm(campo: any) {
    return this.form.get(campo)?.errors && this.form.get(campo)?.dirty;
  }

  updateAccount() {
    if (this.form.invalid) return;
    this.submitting = true;
    const updateAccount: UpdateAccount = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      email: this.form.value.email,
    };
    this.accountService
      .updateAccount(updateAccount)
      .pipe(switchMap(() => this.authService.validateAnRefreshToken()))
      .subscribe({
        next: () => {
          this.submitting = false;
          this.alertService.success('¡Cuenta actualizada exitosamente!');
        },
        error: () => {
          this.submitting = false;
          this.alertService.error();
        },
      });
  }
}
