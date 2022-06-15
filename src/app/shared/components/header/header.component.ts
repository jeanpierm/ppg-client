import { Component } from '@angular/core';
import { LoginComponent } from '../../../auth/pages/login/login.component';
import { RegisterComponent } from '../../../auth/pages/register/register.component';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  static readonly PATH = '';
  menuItems: MenuItem[] = [
    {
      title: 'Registrarme',
      icon: 'rocket_launch',
      path: this.registerRoute,
    },
    {
      title: 'Iniciar sesión',
      icon: 'login',
      path: this.loginRoute,
    },
  ];

  constructor() {}

  get homeRoute() {
    return `/${HeaderComponent.PATH}`;
  }

  get registerRoute() {
    return `/${RegisterComponent.PATH}`;
  }

  get loginRoute() {
    return `/${LoginComponent.PATH}`;
  }
}
