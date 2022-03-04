import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../../config/sweetAlert';

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
    public loginService: LoginService,
    public accountService: AccountService,
    private route: Router
  ) {
    this.hide = true;
    this.acceso = false;
    this.textLogin = 'Iniciar sesión';
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {}

  async login(email: any, password: any) {
    if (email.trim().length === 0) {
      Swal.fire({
        title: 'Por favor ingresar su Email',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (password.trim().length === 0) {
      console.log('Por favor ingresar su contraseña');
      return;
    }

    let data = {
      email: email,
      password: password,
    };

    try {
      this.textLogin = 'Accediendo...';
      this.acceso = true;
      let token = await this.loginService.Auth(data).toPromise();
      this.set('token', token.accessToken);

      let user = await this.accountService.getAccount().toPromise();
      this.set('name', user.data.name);
      this.set('surname', user.data.surname);
      this.set('email', user.data.email);
      this.route.navigate(['/starter']);
    } catch (err) {
      this.textLogin = 'Iniciar sesión';
      this.acceso = false;

      console.log(err);
      Swal.fire({
        title: 'Ha ocurrido un error',
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
