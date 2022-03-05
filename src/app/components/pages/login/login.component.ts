import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../../config/sweetAlert';
import { LoginRequest } from '../../../models/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hide: boolean;
  public acceso: boolean;
  public textLogin: String;
  public alert: SweetAlert;

  constructor(
    public authService: AuthService,
    public accountService: AccountService,
    private route: Router
  ) {
    this.hide = true;
    this.acceso = false;
    this.textLogin = 'Iniciar sesión';
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {}

  async login(email: string, password: string) {
    if (email.trim().length === 0) {
      Swal.fire({
        title: 'Por favor, ingresar su email',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (password.trim().length === 0) {
      Swal.fire({
        title: 'Por favor, ingresar su contraseña',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    let loginRequest: LoginRequest = {
      email: email,
      password: password,
    };

    try {
      this.textLogin = 'Accediendo...';
      this.acceso = true;
      const token = await firstValueFrom(this.authService.login(loginRequest));

      const { data } = await firstValueFrom(this.accountService.getAccount());
      this.set('name', data.name);
      this.set('surname', data.surname);
      this.set('email', data.email);
      this.route.navigate(['/starter']);
    } catch (err: any) {
      this.textLogin = 'Iniciar sesión';
      this.acceso = false;

      if (err.status === 400) {
        Swal.fire({
          title: 'Por favor, verifique los campos ingresados',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      if (err.status === 404) {
        Swal.fire({
          title: 'No se encontró al usuario. Por favor, regístrese',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      if (err.status === 401) {
        Swal.fire({
          title:
            'El correo o contraseña no son correctos. Por favor, verifique sus credenciales',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      Swal.fire({
        title:
          'Ha ocurrido un error en el servidor. Por favor, vuelva a intentar más tarde',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  set(key: string, data: string) {
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      console.log(e);
    }
  }
}
