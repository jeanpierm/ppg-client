import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AccountService } from 'src/app/ppg/services/account.service';
import { SweetAlert } from '../../../ppg/config/sweetAlert';
import { setAccountDataInLocalStorage, showErrorAlert } from '../../../shared/utils';
import { LoginRequest } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  static readonly PATH = 'login';

  hide: boolean = true;
  loading: boolean = false;
  alert: SweetAlert = new SweetAlert();
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: Router
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async login() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const loginRequest: LoginRequest = {
      email: this.email?.value,
      password: this.password?.value,
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.accountService.getAccount().subscribe({
          next: ({ data }) => {
            setAccountDataInLocalStorage(data);
            this.route.navigate(['/home']).then(() => {
              this.loading = false;
            });
          },
        });
      },
      error: (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          showErrorAlert(loginErrors[err.status]);
          return;
        }
      },
    });
  }
}

const loginErrors = {
  400: 'La contraseña o correo no son correctos. Por favor, verifique sus credenciales.',
  401: 'La contraseña o correo no son correctos. Por favor, verifique sus credenciales.',
  404: 'No se encontró su cuenta. Por favor, regístrese.',
};
