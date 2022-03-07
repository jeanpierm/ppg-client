import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './ppg/pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ProfilesComponent } from './ppg/pages/profiles/profiles.component';
import { GenerateComponent } from './ppg/pages/generate/generate.component';
import { AccountComponent } from './ppg/pages/account/account.component';
import { RequireAuthGuard } from './auth/guards/require-auth.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { PpgComponent } from './ppg/ppg.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: PpgComponent.PATH,
    loadChildren: () => import('./ppg/ppg.module').then((m) => m.PpgModule),
    canLoad: [RequireAuthGuard],
    canActivate: [RequireAuthGuard],
  },
  {
    path: '**',
    redirectTo: PpgComponent.PATH,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
