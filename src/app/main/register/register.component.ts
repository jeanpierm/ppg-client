import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericErrorStateMatcher } from 'src/app/core/utils/error-state-matcher';
import Swal from 'sweetalert2';
import {
  getPasswordValidationMessage,
  validateTwoFormControlsAreEquals,
} from '../../core/utils/form.util';
import { AlertService } from '../../core/services/alert.service';
import { AuthService } from '../../core/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterRequest } from './interfaces/register-request.interface';
import { map, Observable, startWith } from 'rxjs';
import { predefinedJobTitles } from '../../core/constants/job-titles.constant';
import { HomeComponent } from '../home/home.component';
import { predefinedLocations } from '../../core/constants/locations.constant';
import { PasswordConfig } from '../../core/config/password.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  static readonly PATH = 'registro';

  filteredJobTitles!: Observable<string[]>;
  filteredLocations!: Observable<string[]>;
  hidePass: boolean = true;
  hidePass2: boolean = true;
  loading: boolean = false;
  matcher = new GenericErrorStateMatcher();
  registerForm: UntypedFormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
      ],
      surname: [
        '',
        [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
      ],
      email: ['', [Validators.required, Validators.email]],
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
      jobTitle: ['', [Validators.required]],
      location: ['', [Validators.required]],
    },
    {
      validators: [validateTwoFormControlsAreEquals('password', 'password2')],
    }
  );

  constructor(
    private readonly authService: AuthService,
    private readonly fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}

  get name() {
    return this.registerForm.get('name');
  }

  get surname() {
    return this.registerForm.get('surname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  get jobTitle() {
    return this.registerForm.get('jobTitle');
  }

  get location() {
    return this.registerForm.get('location');
  }

  get loginRoute() {
    return `/${LoginComponent.PATH}`;
  }

  ngOnInit(): void {
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

  async register() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const newUser: RegisterRequest = this.getUserFromForm();

    this.authService.register(newUser).subscribe({
      next: async () => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado exitosamente.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl(`/${HomeComponent.PATH}`).then(() => {
          this.loading = false;
        });
      },
      error: (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          this.alertService.error(registerErrors[err.status]);
          return;
        }
      },
    });
  }

  getUserFromForm(): RegisterRequest {
    const { name, email, surname, password, jobTitle, location } =
      this.registerForm.value;
    return { name, email, surname, password, jobTitle, location };
  }

  getPasswordValidationMsg(password: string): string | void {
    return getPasswordValidationMessage(password);
  }
}

const registerErrors = {
  409: { title: 'El correo electrónico ya está registrado.' },
};
