import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { TechnologiesComponent } from '../../admin/pages/technologies/technologies.component';
import { UsersComponent } from '../../admin/pages/users/users.component';
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
        path: EditAccountComponent.PATH,
        component: EditAccountComponent,
        data: {
          title: 'Configuración de cuenta',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpgRoutingModule {}
