import { Component } from '@angular/core';
import { AccountComponent } from '../../../main/account/account.component';
import { EditAccountComponent } from '../../../main/account/pages/edit-account/edit-account.component';
import { LoginComponent } from '../../../main/auth/pages/login/login.component';
import { RegisterComponent } from '../../../main/auth/pages/register/register.component';
import { AuthService } from '../../../main/auth/services/auth.service';
import { DiscoverComponent } from '../../../main/profiles/pages/discover/discover.component';
import { HomeComponent } from '../../../main/home/home.component';
import { ProfileListComponent } from '../../../main/profiles/pages/profile-list/profile-list.component';
import { MenuOption } from '../../interfaces/menu-option.interface';
import { DashboardComponent } from '../../../main/profiles/pages/dashboard/dashboard.component';
import { AdminComponent } from '../../../admin/admin.component';
import { AccountService } from '../../../main/account/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOptions: MenuOption[] = [
    {
      label: 'Cuenta',
      icon: 'settings',
      path: this.editAccountRoute,
    },
    {
      label: 'Mis Perfiles Profesionales',
      icon: 'group',
      path: this.profilesRoute,
    },
    {
      label: 'Dashboard',
      icon: 'dashboard',
      path: this.dashboardRoute,
    },
  ];

  constructor(
    public readonly authService: AuthService,
    public accountService: AccountService
  ) {}

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
    return `/${ProfileListComponent.PATH}/${DiscoverComponent.PATH}`;
  }

  get accountRoute() {
    return `/${AccountComponent.PATH}`;
  }

  get editAccountRoute() {
    return `/${AccountComponent.PATH}/${EditAccountComponent.PATH}`;
  }

  get profilesRoute() {
    return `/${ProfileListComponent.PATH}`;
  }

  get dashboardRoute() {
    return `/${ProfileListComponent.PATH}/${DashboardComponent.PATH}`;
  }

  get adminRoute() {
    return `/${AdminComponent.PATH}`;
  }

  logout(): void {
    this.authService.logout();
  }
}
