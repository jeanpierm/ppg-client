import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './main/account/account.component';
import { AdminGuard } from './core/guards/admin.guard';
// import { HomeComponent } from './main/home/home.component';

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
