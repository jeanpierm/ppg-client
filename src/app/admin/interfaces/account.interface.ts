import { MenuItem } from '../../shared/interfaces/menu-item.interface';
import { UserIntf } from './user.interface';

export interface Account extends UserIntf {
  options: MenuItem[];
}
