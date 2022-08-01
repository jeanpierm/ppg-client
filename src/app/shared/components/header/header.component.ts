import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Role } from '../../../core/enums/role.enum';
import { MenuOption } from '../../../core/interfaces/menu-option.interface';
import { AuthService } from '../../../core/services/auth.service';
import { RoutesService } from '../../../core/services/routes.service';
import { AccountService } from '../../../main/account/services/account.service';

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
      path: this.routes.overviewAccountRoute,
    },
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public readonly routes: RoutesService,
    public readonly authService: AuthService,
    public readonly accountService: AccountService,
    private readonly breakpointObserver: BreakpointObserver
  ) {}

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
