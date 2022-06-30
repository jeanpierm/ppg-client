import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  static readonly PATH = 'overview';

  constructor(private readonly authService: AuthService) {}

  get account() {
    return this.authService.authAccount;
  }
}
