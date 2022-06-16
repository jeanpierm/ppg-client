import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: DiscoverComponent.PATH,
    loadChildren: () =>
      import('./discover/discover.module').then((m) => m.DiscoverModule),
  },
  {
    path: ProfileComponent.PATH,
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: AccountComponent.PATH,
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: AdminComponent.PATH,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: AccountComponent.PATH,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
