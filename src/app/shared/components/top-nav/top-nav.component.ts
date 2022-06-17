import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/main/auth/services/auth.service';
import { LocalStorageKeys } from '../../../core/enums/local-storage-keys.enum';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();
  name!: string;
  surname!: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.name = localStorage.getItem(LocalStorageKeys.Name) || '';
    this.surname = localStorage.getItem(LocalStorageKeys.Surname) || '';
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
