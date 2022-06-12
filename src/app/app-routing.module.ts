import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AccountComponent.PATH,
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard],
  },
  // {
  //   path: LoginComponent.PATH,
  //   component: LoginComponent,
  //   canActivate: [NoAuthGuard],
  // },
  // {
  //   path: RegisterComponent.PATH,
  //   component: RegisterComponent,
  //   canActivate: [NoAuthGuard],
  // },
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
