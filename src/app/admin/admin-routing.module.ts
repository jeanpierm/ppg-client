import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: UsersComponent.PATH, component: UsersComponent },
      { path: TechnologiesComponent.PATH, component: TechnologiesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
