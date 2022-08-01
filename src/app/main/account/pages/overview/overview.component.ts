import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RoutesService } from '../../../../core/services/routes.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  static readonly PATH = 'overview';
  account = this.authService.authAccount;

  constructor(
    private readonly authService: AuthService,
    public routes: RoutesService
  ) {}

  get fullName() {
    return `${this.account.name} ${this.account.surname}`;
  }
}
