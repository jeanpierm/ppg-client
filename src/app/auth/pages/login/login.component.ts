import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AccountService } from 'src/app/ppg/services/account.service';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../../ppg/config/sweetAlert';
import { User } from '../../../ppg/models/account/user';
import {
  isEmpty,
  setUserDataInLocalStorage,
  showAlert,
  showErrorAlert,
} from '../../../shared/utils';
import { LoginRequest } from '../../interfaces/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    console.log('init');
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const loginRequest: LoginRequest = {
      email: this.email?.value,
      password: this.password?.value,
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.accountService.getAccount().subscribe({
          next: ({ data }) => {
            setUserDataInLocalStorage(data);
            this.route.navigate(['/home']).then(() => {
              this.loading = false;
            });
          },
        });
      },
      error: (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 401) {
            showErrorAlert(
              'La contraseña o correo no son correctos. Por favor, verifique sus credenciales.'
            );
            return;
          }

          if (err.status === 404) {
            showErrorAlert('No se encontró al usuario. Por favor, regístrese.');
            return;
          }

          showErrorAlert();
          return;
        }
      },
    });
  }
}
