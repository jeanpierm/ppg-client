import { Component } from '@angular/core';
import { MenuOption } from '../../../core/interfaces/menu-option.interface';
import { RoutesService } from '../../../core/services/routes.service';

@Component({
  selector: 'app-admin-nav-list',
  templateUrl: './admin-nav-list.component.html',
  styleUrls: ['./admin-nav-list.component.css'],
})
export class AdminNavListComponent {
  showMenu = false;
  maintenanceOptions: MenuOption[] = [
    {
      label: 'Mantenimiento de Tecnologías',
      icon: 'code',
      path: this.routes.technologiesRoute,
    },
    {
      label: 'Mantenimiento de Tipos de Tecnologías',
      icon: 'featured_play_list',
      path: this.routes.techTypesRoute,
    },
    {
      label: 'Mantenimiento de Usuarios',
      icon: 'group',
      path: this.routes.usersRoute,
    },
  ];

  auditOptions: MenuOption[] = [
    {
      label: 'Auditoría de Logs',
      icon: 'group',
      path: this.routes.logsRoute,
    },
  ];

  constructor(public readonly routes: RoutesService) {}
}
