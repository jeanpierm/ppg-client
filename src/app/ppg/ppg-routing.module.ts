import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GenerateComponent } from './pages/generate/generate.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { AccountComponent } from './pages/account/account.component';
import { PpgComponent } from './ppg.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';

const routes: Routes = [
  {
    path: '',
    component: PpgComponent,
    children: [
      {
        path: DashboardComponent.PATH,
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: GenerateComponent.PATH,
        component: GenerateComponent,
        data: {
          title: 'Generar PP',
        },
      },
      {
        path: AccountComponent.PATH,
        component: AccountComponent,
        data: {
          title: 'Configuración de cuenta',
        },
      },
      {
        path: ProfilesComponent.PATH,
        component: ProfilesComponent,
        data: {
          title: 'Perfiles profesionales',
        },
      },
      {
        path: TechnologiesComponent.PATH,
        component: TechnologiesComponent,
        data: {
          title: 'Tecnologías',
        },
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpgRoutingModule {}
