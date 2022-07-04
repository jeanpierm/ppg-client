import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './main/account/account.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './main/auth/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: AdminComponent.PATH,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AdminGuard],
    canActivate: [AdminGuard],
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
