import { Component } from '@angular/core';
import { AccountComponent } from '../account/account.component';
import { ProfilesComponent } from '../account/pages/profiles/profiles.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent {
  static readonly PATH = 'descubrir';

  get accountProfilesRoute() {
    return `/${AccountComponent.PATH}/${ProfilesComponent.PATH}`;
  }
}
