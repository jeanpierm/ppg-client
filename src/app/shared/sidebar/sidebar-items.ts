import { AccountComponent } from 'src/app/ppg/pages/account/account.component';
import { DashboardComponent } from 'src/app/ppg/pages/dashboard/dashboard.component';
import { GenerateComponent } from 'src/app/ppg/pages/generate/generate.component';
import { ProfilesComponent } from 'src/app/ppg/pages/profiles/profiles.component';
import { TechnologiesComponent } from 'src/app/ppg/pages/technologies/technologies.component';
import { PpgComponent } from 'src/app/ppg/ppg.component';
import { RouteInfo } from './interfaces/route-info.interface';

export const sidebarItems: RouteInfo[] = [
  {
    icon: 'settings',
    title: 'Mi cuenta',
    path: `/${PpgComponent.PATH}/${AccountComponent.PATH}`,
  },
  {
    icon: 'file_copy',
    title: 'Mis perfiles',
    path: `/${PpgComponent.PATH}/${ProfilesComponent.PATH}`,
  },
  {
    icon: 'search',
    title: 'Generar perfil',
    path: `/${PpgComponent.PATH}/${GenerateComponent.PATH}`,
  },
  {
    icon: 'dashboard',
    title: 'Dashboard',
    path: `/${PpgComponent.PATH}/${DashboardComponent.PATH}`,
  },
  {
    icon: 'devices',
    title: 'Tecnologias',
    path: `/${PpgComponent.PATH}/${TechnologiesComponent.PATH}`,
  },
];
