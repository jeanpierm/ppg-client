import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';
import { AuthService } from '../../core/services/auth.service';
import { RoutesService } from '../../core/services/routes.service';
import { HomeComponent } from '../home/home.component';
import { LoginRequest } from './interfaces/login-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  static readonly PATH = 'login';

  hide: boolean = true;
  loading: boolean = false;
  loginForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly fb: UntypedFormBuilder,
    private readonly route: Router,
    private readonly alertService: AlertService,
    public readonly routes: RoutesService
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
        this.route.navigateByUrl(`/${HomeComponent.PATH}`).then(() => {
          this.loading = false;
        });
      },
      error: (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          this.alertService.error(loginErrors[err.status]);
          return;
        }
      },
    });
  }
}

const loginErrors = {
  400: {
    title: 'La contraseña o correo no son correctos.',
    text: 'Por favor, verifique sus credenciales.',
  },
  401: {
    title: 'La contraseña o correo no son correctos',
    text: 'Por favor, verifique sus credenciales.',
  },
  404: {
    title: 'No se encontró su cuenta.',
    text: 'Puede registrarse dando click en "Crear cuenta".',
  },
};
