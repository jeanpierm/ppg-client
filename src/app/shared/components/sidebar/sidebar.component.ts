import { Component } from '@angular/core';
import { AuthService } from '../../../main/auth/services/auth.service';
import { MenuOption } from '../../interfaces/menu-option.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  showMenu = false;
  options: MenuOption[] = [];

  constructor(private authService: AuthService) {}
}
