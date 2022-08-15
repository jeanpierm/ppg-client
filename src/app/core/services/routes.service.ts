import { Injectable } from '@angular/core';
import { TechTypesComponent } from 'src/app/admin/pages/tech-types/tech-types.component';
import { AdminComponent } from '../../admin/admin.component';
import { LogsComponent } from '../../admin/pages/logs/logs.component';
import { TechnologiesComponent } from '../../admin/pages/technologies/technologies.component';
import { UsersComponent } from '../../admin/pages/users/users.component';
import { AccountComponent } from '../../main/account/account.component';
import { EditAccountComponent } from '../../main/account/pages/edit-account/edit-account.component';
import { OverviewComponent } from '../../main/account/pages/overview/overview.component';
import { HomeComponent } from '../../main/home/home.component';
import { LoginComponent } from '../../main/login/login.component';
import { PasswordResetComponent } from '../../main/password-reset/password-reset.component';
import { DashboardComponent } from '../../main/profiles/pages/dashboard/dashboard.component';
import { DiscoverComponent } from '../../main/profiles/pages/discover/discover.component';
import { ProfileListComponent } from '../../main/profiles/pages/profile-list/profile-list.component';
import { RegisterComponent } from '../../main/register/register.component';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor() {}

  get discoverRoute() {
    return `/${ProfileListComponent.PATH}/${DiscoverComponent.PATH}`;
  }

  get technologiesRoute() {
    return `/${AdminComponent.PATH}/${TechnologiesComponent.PATH}`;
  }

  get techTypesRoute() {
    return `/${AdminComponent.PATH}/${TechTypesComponent.PATH}`;
  }

  get usersRoute() {
    return `/${AdminComponent.PATH}/${UsersComponent.PATH}`;
  }

  get registerRoute() {
    return `/${RegisterComponent.PATH}`;
  }

  get loginRoute() {
    return `/${LoginComponent.PATH}`;
  }

  get homeRoute() {
    return `/${HomeComponent.PATH}`;
  }

  get accountRoute() {
    return `/${AccountComponent.PATH}`;
  }

  get overviewAccountRoute() {
    return `/${AccountComponent.PATH}/${OverviewComponent.PATH}`;
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

  get passwordResetRoute() {
    return `/${PasswordResetComponent.PATH}`;
  }

  get adminRoute() {
    return `/${AdminComponent.PATH}`;
  }

  get logsRoute() {
    return `/${this.adminRoute}/${LogsComponent.PATH}`;
  }
}
