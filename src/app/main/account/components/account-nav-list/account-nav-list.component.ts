import { Component, EventEmitter, Output } from '@angular/core';
import { MenuOption } from '../../../../core/interfaces/menu-option.interface';
import { EditAccountComponent } from '../../pages/edit-account/edit-account.component';
import { OverviewComponent } from '../../pages/overview/overview.component';
import { PasswordComponent } from '../../pages/password/password.component';

@Component({
  selector: 'app-account-nav-list',
  templateUrl: './account-nav-list.component.html',
  styleUrls: ['./account-nav-list.component.scss'],
})
export class AccountNavListComponent {
  readonly menuOptions: MenuOption[] = [
    {
      icon: 'home',
      label: 'Vista general de mi cuenta',
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
      path: PasswordComponent.PATH,
    },
  ];
  @Output() clickOption: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
}
