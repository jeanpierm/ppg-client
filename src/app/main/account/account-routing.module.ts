import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { AccountComponent } from './account.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditDownloadComponent } from './pages/edit-download/edit-download.component';

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
      },
      {
        path: ChangePasswordComponent.PATH,
        component: ChangePasswordComponent,
      },
      {
        path: EditDownloadComponent.PATH,
        component: EditDownloadComponent,
      },
      {
        path: '**',
        redirectTo: OverviewComponent.PATH,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpgRoutingModule {}
