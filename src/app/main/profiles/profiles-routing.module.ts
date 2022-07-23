import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileListComponent,
    pathMatch: 'full',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: DiscoverComponent.PATH,
    component: DiscoverComponent,
  },
  {
    path: DashboardComponent.PATH,
    component: DashboardComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ProfileComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
