import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileListComponent,
    pathMatch: 'full',
  },
  {
    path: 'descubrir',
    component: DiscoverComponent,
  },
  {
    path: ':id',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
