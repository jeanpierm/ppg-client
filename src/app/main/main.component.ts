import { Component } from '@angular/core';
import { MenuOption } from '../core/interfaces/menu-option.interface';
import { RoutesService } from '../core/services/routes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  readonly menuOptions: MenuOption[] = [
    {
      icon: 'home',
      label: 'Inicio',
      path: this.routes.homeRoute,
    },
    {
      icon: 'rocket_launch',
      label: 'Descubrir',
      path: this.routes.discoverRoute,
    },
    {
      icon: 'group',
      label: 'Mis perfiles',
      path: this.routes.profilesRoute,
    },
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: this.routes.dashboardRoute,
    },
  ];

  constructor(public readonly routes: RoutesService) {}
}
