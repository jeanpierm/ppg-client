import { Component } from '@angular/core';
import { DiscoverComponent } from '../profiles/pages/discover/discover.component';
import { ProfileListComponent } from '../profiles/pages/profile-list/profile-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  static readonly PATH = '';

  constructor() {}

  get discoverRoute() {
    return `/${ProfileListComponent.PATH}/${DiscoverComponent.PATH}`;
  }
}
