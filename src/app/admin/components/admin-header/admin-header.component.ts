import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/main/auth/services/auth.service';
import { RoutesService } from '../../../core/services/routes.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
  @Output() sideNavToggled = new EventEmitter<void>();

  constructor(
    public readonly routes: RoutesService,
    private readonly authService: AuthService
  ) {}

  get account() {
    return this.authService.authAccount;
  }

  get fullName() {
    const { name, surname } = this.account;
    return `${name} ${surname}`;
  }

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  logout(): void {
    this.authService.logout();
  }

  goToAccount(): void {
    alert('hello');
  }
}
