import { MenuItem } from '../../shared/interfaces/menu-item.interface';

export interface Account {
  userId: string;
  name: string;
  surname: string;
  email: string;
  options: MenuItem[];
}
