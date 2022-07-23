import { Component } from '@angular/core';
import { RoutesService } from '../../core/services/routes.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  static readonly PATH = '';

  today: Date = new Date();
  todayFormatted: string = `${this.today.getDate()}/${this.today.getMonth()}/${this.today.getFullYear()}`;

  constructor(
    private readonly authService: AuthService,
    public readonly routes: RoutesService
  ) {
    if (this.authService.accessToken) {
      this.authService.validateToken().subscribe((valid) => {
        if (!valid) {
          this.authService.logout();
        }
      });
    }
  }
}
