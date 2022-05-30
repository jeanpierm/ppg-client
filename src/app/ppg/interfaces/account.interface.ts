import { RouteInfo } from '../../shared/sidebar/interfaces/route-info.interface';

export interface Account {
  userId: string;
  name: string;
  surname: string;
  email: string;
  options: RouteInfo;
}
