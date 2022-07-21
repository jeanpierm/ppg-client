import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { MainComponent } from './main.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileListComponent } from './profiles/pages/profile-list/profile-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: ProfileListComponent.PATH,
        loadChildren: () =>
          import('./profiles/profiles.module').then((m) => m.ProfilesModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
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
        path: AccountComponent.PATH,
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
