import { Component, EventEmitter, Output } from '@angular/core';
import { MenuOption } from '../../../../core/interfaces/menu-option.interface';
import { EditAccountComponent } from '../../pages/edit-account/edit-account.component';
import { OverviewComponent } from '../../pages/overview/overview.component';
import { ChangePasswordComponent } from '../../pages/change-password/change-password.component';
import { EditDownloadComponent } from '../../pages/edit-download/edit-download.component';

@Component({
  selector: 'app-account-nav-list',
  templateUrl: './account-nav-list.component.html',
  styleUrls: ['./account-nav-list.component.scss'],
})
export class AccountNavListComponent {
  readonly menuOptions: MenuOption[] = [
    {
      icon: 'home',
      label: 'Visión general de mi cuenta',
      path: OverviewComponent.PATH,
    },
    {
      icon: 'edit',
      label: 'Editar cuenta',
      path: EditAccountComponent.PATH,
    },
    {
      icon: 'lock',
      label: 'Cambiar contraseña',
      path: ChangePasswordComponent.PATH,
    },
    {
      icon: 'app_registration',
      label: 'Editar descarga de perfil',
      path: EditDownloadComponent.PATH,
    },
  ];
  @Output() clickOption: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
}
