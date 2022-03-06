import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();

  public name: any;
  public surname: any;

  constructor(
    private route: Router,
    private readonly authService: AuthService
  ) {
    this.name = '';
    this.surname = '';
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.surname = localStorage.getItem('surname');
  }

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
