import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'starter',
    component: NavigationComponent
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
