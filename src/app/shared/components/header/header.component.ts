import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MenuOption } from '../../../core/interfaces/menu-option.interface';
import { AccountService } from '../../../main/account/services/account.service';
import { Role } from '../../../core/enums/role.enum';
import { RoutesService } from '../../../core/services/routes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  menuOptions: MenuOption[] = [
    {
      label: 'Cuenta',
      icon: 'settings',
      path: this.routes.editAccountRoute,
    },
  ];

  constructor(
    public readonly routes: RoutesService,
    public readonly authService: AuthService,
    public readonly accountService: AccountService
  ) {}

  get isAuthenticated() {
    return !!this.authService.accessToken;
  }

  get isAuth() {
    return !!this.authService.authAccount.userId;
  }
  get isAdmin() {
    return this.authService.authAccount.roleName === Role.Admin;
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
