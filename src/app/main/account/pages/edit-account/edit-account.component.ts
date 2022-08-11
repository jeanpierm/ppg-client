import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { predefinedJobTitles } from '../../../../core/constants/job-titles.constant';
import { predefinedLocations } from '../../../../core/constants/locations.constant';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
  static readonly PATH = 'edit';

  filteredJobTitles!: Observable<string[]>;
  filteredLocations!: Observable<string[]>;
  submitting: boolean = false;
  form: UntypedFormGroup = this.fb.group({
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
    private readonly fb: UntypedFormBuilder,
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
    this.filteredJobTitles = this.jobTitle!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', predefinedJobTitles))
    );
    this.filteredLocations = this.location!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', predefinedLocations))
    );
  }

  private _filter(value: string, values: string[]): string[] {
    const filterValue = value.toLowerCase();

    return values.filter((option) =>
      option.toLowerCase().includes(filterValue.toLowerCase())
    );
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
      .pipe(switchMap(() => this.authService.validateToken()))
      .subscribe({
        next: () => {
          this.submitting = false;
          this.alertService.success({ title: 'Cuenta actualiza con éxito' });
        },
        error: (err) => {
          this.submitting = false;
          if (err instanceof HttpErrorResponse) {
            this.alertService.error(editErrors[err.status]);
          }
        },
      });
  }
}

const editErrors = {
  409: { title: 'El correo electrónico ingresado ya está registrado' },
};
