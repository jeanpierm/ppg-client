import { Component } from '@angular/core';
import { DiscoverComponent } from '../discover/discover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  static readonly PATH = '';

  constructor() {}

  get discoverRoute() {
    return `/${DiscoverComponent.PATH}`;
  }
}
