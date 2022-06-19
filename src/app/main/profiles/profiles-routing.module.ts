import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
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
    path: 'descubrir',
    component: DiscoverComponent,
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
