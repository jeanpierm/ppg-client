import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AccountComponent } from '../../account.component';
import { EditAccountComponent } from '../edit-account/edit-account.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  static readonly PATH = 'overview';
  account = this.authService.authAccount;
  constructor(private readonly authService: AuthService) {}

  // get account() {
  //   return this.authService.authAccount;
  // }

  get fullName() {
    return `${this.account.name} ${this.account.surname}`;
  }

  get editAccountRoute() {
    return `/${AccountComponent.PATH}/${EditAccountComponent.PATH}`;
  }
}
