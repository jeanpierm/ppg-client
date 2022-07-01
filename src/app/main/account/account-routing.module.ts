import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { AccountComponent } from './account.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PasswordComponent } from './pages/password/password.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: OverviewComponent.PATH,
        component: OverviewComponent,
      },
      {
        path: EditAccountComponent.PATH,
        component: EditAccountComponent,
        data: {
          title: 'Editar cuenta',
        },
      },
      {
        path: PasswordComponent.PATH,
        component: PasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpgRoutingModule {}
