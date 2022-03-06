import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { MyProfessionalProfilesComponent } from './components/my-professional-profiles/my-professional-profiles.component';
import { GenerateComponent } from './components/generate/generate.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { AuthGuard } from './guards/auth.guard';
import { FullComponent } from './layout/full/full.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'starter',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'dashboard',
        },
      },
      {
        path: 'generar',
        component: GenerateComponent,
        data: {
          title: 'Generar PP',
        },
      },
      {
        path: 'configuracion',
        component: UserConfigComponent,
        data: {
          title: 'Configuracion',
        },
      },
      {
        path: 'perfiles-profesionales',
        component: MyProfessionalProfilesComponent,
        data: {
          title: 'Perfiles profesionales',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
