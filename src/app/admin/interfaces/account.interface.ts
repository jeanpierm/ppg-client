import { MenuOption } from '../../shared/interfaces/menu-option.interface';
import { UserIntf } from './user.interface';

export interface Account extends UserIntf {
  options: MenuOption[];
}
