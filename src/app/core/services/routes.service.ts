import { Injectable } from '@angular/core';
import { AdminComponent } from '../../admin/admin.component';
import { TechnologiesComponent } from '../../admin/pages/technologies/technologies.component';
import { UsersComponent } from '../../admin/pages/users/users.component';
import { HomeComponent } from '../../main/home/home.component';
import { DiscoverComponent } from '../../main/profiles/pages/discover/discover.component';
import { ProfileListComponent } from '../../main/profiles/pages/profile-list/profile-list.component';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor() {}

  get discoverRoute() {
    return `/${ProfileListComponent.PATH}/${DiscoverComponent.PATH}`;
  }

  get technologiesRoute() {
    return `/${AdminComponent.PATH}/${TechnologiesComponent.PATH}`;
  }

  get usersRoute() {
    return `/${AdminComponent.PATH}/${UsersComponent.PATH}`;
  }

  get homeRoute() {
    return `/${HomeComponent.PATH}`;
  }
}
