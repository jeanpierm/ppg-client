import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
  static readonly PATH = 'edit';

  submitting: boolean = false;
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
    jobTitle: ['', [Validators.required]],
    location: ['', [Validators.required]],
    biography: [''],
    linkedIn: [''],
    github: [''],
    portfolio: [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService
  ) {}

  get name() {
    return this.form.get('name');
  }
  get surname() {
    return this.form.get('surname');
  }
  get email() {
    return this.form.get('email');
  }
  get jobTitle() {
    return this.form.get('jobTitle');
  }
  get location() {
    return this.form.get('location');
  }
  get biography() {
    return this.form.get('biography');
  }
  get linkedIn() {
    return this.form.get('linkedIn');
  }
  get github() {
    return this.form.get('github');
  }
  get portfolio() {
    return this.form.get('portfolio');
  }

  cancel() {
    location.reload();
  }

  ngOnInit(): void {
    this.setAccountDataInForm();
  }

  setAccountDataInForm() {
    const accountData = this.authService.authAccount;
    this.form.setValue({
      name: accountData.name,
      surname: accountData.surname,
      email: accountData.email,
      jobTitle: accountData.jobTitle,
      location: accountData.location,
      biography: accountData.biography || '',
      linkedIn: accountData.linkedIn || '',
      portfolio: accountData.portfolio || '',
      github: accountData.github || '',
    });
  }

  updateAccount() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.accountService
      .updateAccount(this.form.value)
      .pipe(switchMap(() => this.authService.validateAndRefreshToken()))
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
