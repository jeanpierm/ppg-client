import { Component } from '@angular/core';
import { AccountComponent } from '../../../main/account/account.component';
import { EditAccountComponent } from '../../../main/account/pages/edit-account/edit-account.component';
import { LoginComponent } from '../../../main/auth/pages/login/login.component';
import { RegisterComponent } from '../../../main/auth/pages/register/register.component';
import { AuthService } from '../../../main/auth/services/auth.service';
import { DiscoverComponent } from '../../../main/discover/discover.component';
import { HomeComponent } from '../../../main/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly title: string = 'descubre perfiles profesionales';

  constructor(public readonly authService: AuthService) {}

  get isAuthenticated() {
    return !!this.authService.accessToken;
  }

  get homeRoute() {
    return `/${HomeComponent.PATH}`;
  }

  get registerRoute() {
    return `/${RegisterComponent.PATH}`;
  }

  get loginRoute() {
    return `/${LoginComponent.PATH}`;
  }

  get discoverRoute() {
    return `/${DiscoverComponent.PATH}`;
  }

  get accountRoute() {
    return `/${AccountComponent.PATH}`;
  }

  get editAccountRoute() {
    return `/${AccountComponent.PATH}/${EditAccountComponent.PATH}`;
  }

  logout(): void {
    this.authService.logout();
  }
}
