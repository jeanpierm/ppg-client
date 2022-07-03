import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericErrorStateMatcher } from 'src/app/core/utils/error-state-matcher';
import Swal from 'sweetalert2';
import {
  getPasswordValidationMessage,
  validateTwoFormControlsAreEquals,
} from '../../../../core/utils/form.util';
import { setAccountDataInLocalStorage } from '../../../../core/utils/local-storage.util';
import { AccountService } from '../../../account/services/account.service';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterRequest } from '../../interfaces/register-request.interface';
import { map, Observable, startWith } from 'rxjs';
import { predefinedJobTitles } from '../../../../core/constants/job-titles.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  static readonly PATH = 'registro';

  hide: boolean = true;
  loading: boolean = false;
  matcher = new GenericErrorStateMatcher();
  filteredOptions!: Observable<string[]>;
  registerForm: FormGroup = this.fb.group(
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
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&.])([A-Za-z\d#@$!%*?&.]|[^ ])/
          ),
        ],
      ],
      password2: ['', Validators.required],
      jobTitle: ['', [Validators.required, Validators.required]],
      location: ['', [Validators.required, Validators.required]],
    },
    {
      validators: [validateTwoFormControlsAreEquals('password', 'password2')],
    }
  );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
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
    this.filteredOptions = this.jobTitle!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return predefinedJobTitles.filter((option) =>
      option.toLowerCase().includes(filterValue)
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
        // this.registerForm.reset();
        this.accountService.getAccount().subscribe({
          next: ({ data }) => {
            setAccountDataInLocalStorage(data);
            this.router.navigate(['/home']).then(() => {
              this.loading = false;
            });
          },
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
    const { name, email, surname, password } = this.registerForm.value;
    return { name, email, surname, password };
  }

  getPasswordValidationMsg(): string | void {
    const password = this.registerForm.get('password')?.value;
    if (!password) return;
    return getPasswordValidationMessage(password);
  }
}

const registerErrors = {
  409: 'El correo electrónico ya está registrado.',
};
