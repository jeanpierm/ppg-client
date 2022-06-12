import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { GenerateComponent } from './professional-profiles/pages/generate/generate.component';
import { ProfilesComponent } from './professional-profiles/pages/profiles/profiles.component';
import { OverviewComponent } from './overview/pages/overview/overview.component';
import { TechnologiesComponent } from './technologies/pages/technologies/technologies.component';
import { UsersComponent } from './users/pages/users/users.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
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
        path: OverviewComponent.PATH,
        component: OverviewComponent,
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
      {
        path: UsersComponent.PATH,
        component: UsersComponent,
        data: {
          title: 'Usuarios',
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
