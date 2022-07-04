import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/main/auth/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  @Output() sideNavToggled = new EventEmitter<void>();

  constructor(
    private readonly router: Router,
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
