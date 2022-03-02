import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SearchComponent } from './components/search/search.component';
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
    /* canActivate: [AuthGuard], */
    children: [
      {
        path: 'busqueda',
        component: SearchComponent,
        data: {
          title: 'Busqueda',
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
