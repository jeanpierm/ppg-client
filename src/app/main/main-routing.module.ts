import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { NoAuthGuard } from '../core/guards/no-auth.guard';
import { MainComponent } from './main.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileListComponent } from './profiles/pages/profile-list/profile-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: ProfileListComponent.PATH,
        loadChildren: () =>
          import('./profiles/profiles.module').then((m) => m.ProfilesModule),
      },
      {
        path: AccountComponent.PATH,
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: LoginComponent.PATH,
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
        canLoad: [NoAuthGuard],
        canActivate: [NoAuthGuard],
      },
      {
        path: RegisterComponent.PATH,
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
        canLoad: [NoAuthGuard],
        canActivate: [NoAuthGuard],
      },
      {
        path: PasswordResetComponent.PATH,
        loadChildren: () =>
          import('./password-reset/password-reset.module').then(
            (m) => m.PasswordResetModule
          ),
        canLoad: [NoAuthGuard],
        canActivate: [NoAuthGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
