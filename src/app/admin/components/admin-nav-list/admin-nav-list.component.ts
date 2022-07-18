import { Component } from '@angular/core';
import { AuthService } from '../../../main/auth/services/auth.service';
import { MenuOption } from '../../../core/interfaces/menu-option.interface';
import { RoutesService } from '../../../core/services/routes.service';

@Component({
  selector: 'app-admin-nav-list',
  templateUrl: './admin-nav-list.component.html',
  styleUrls: ['./admin-nav-list.component.css'],
})
export class AdminNavListComponent {
  showMenu = false;
  options: MenuOption[] = [
    {
      label: 'Mantenimiento de Tecnologías',
      icon: 'code',
      path: this.routes.technologiesRoute,
    },
    {
      label: 'Mantenimiento de tipo de tecnologías',
      icon: 'featured_play_list',
      path: this.routes.techTypesRoute,
    },
    {
      label: 'Mantenimiento de Usuarios',
      icon: 'group',
      path: this.routes.usersRoute,
    },
  ];

  constructor(
    private authService: AuthService,
    public readonly routes: RoutesService
  ) {}
}
