import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/ppg/services/account.service';
import { GenericErrorStateMatcher } from 'src/app/shared/error-state-matcher';
import Swal from 'sweetalert2';
import {
  setAccountDataInLocalStorage,
  showErrorAlert,
  validateTwoFormControlsAreEquals,
} from '../../../shared/utils';
import { RegisterRequest } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  static readonly PATH = 'register';

  hide: boolean = true;
  loading: boolean = false;
  matcher = new GenericErrorStateMatcher();
  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)]],
      surname: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/
          ),
        ],
      ],
      password2: ['', Validators.required],
    },
    {
      validators: [validateTwoFormControlsAreEquals('password', 'password2')],
    }
  );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
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
          showErrorAlert(registerErrors[err.status]);
          return;
        }
      },
    });
  }

  getUserFromForm(): RegisterRequest {
    const { name, email, surname, password } = this.registerForm.value;
    return { name, email, surname, password };
  }

  getPasswordValidationMessage(): string | void {
    const control = this.registerForm.get('password')?.value;
    if (!control) return;
    if (control.toString().trim().length < 8 || control.toString().trim().length > 30) {
      return 'La contraseña debe contener mínimo 8 y máximo 30 caracteres';
    }
    if (!control.match(/^(?=.*[a-z])(?=.*[A-Z])([A-Za-z]|[^ ])*$/)) {
      return 'La contraseña debe contener mayúsculas y minúsculas';
    }
    if (!control.match(/^(?=.*\d)([\d]|[^ ])*$/)) {
      return 'La contraseña debe contener al menos un valor numérico';
    }
    if (!control.match(/^(?=.*[$@$!%*?&.])([$@$!%*?&.]|[^ ])*$/)) {
      return 'La contraseña debe contener al menos un carácter especial [$@$!%*?&.]';
    }
  }
}

const registerErrors = {
  409: 'El correo electrónico ya está registrado.',
};
