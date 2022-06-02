import { Role } from './role.interface';

export interface User {
  userId: string;
  email: string;
  surname: string;
  name: string;
  role: Role;
  status: string;
}
