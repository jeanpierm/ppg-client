import { MenuOption } from '../../shared/sidebar/interfaces/menu-option.interface';

export interface Account {
  userId: string;
  name: string;
  surname: string;
  email: string;
  options: MenuOption[];
}
