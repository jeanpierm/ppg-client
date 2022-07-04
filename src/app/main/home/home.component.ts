import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { DiscoverComponent } from '../profiles/pages/discover/discover.component';
import { ProfileListComponent } from '../profiles/pages/profile-list/profile-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  static readonly PATH = '';

  constructor(private readonly authService: AuthService) {
    if (this.authService.accessToken) {
      this.authService.validateToken().subscribe((valid) => {
        if (!valid) {
          this.authService.logout();
        }
      });
    }
  }

  get discoverRoute() {
    return `/${ProfileListComponent.PATH}/${DiscoverComponent.PATH}`;
  }
}
