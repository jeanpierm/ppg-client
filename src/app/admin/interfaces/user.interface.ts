import { Role } from './role.interface';

export interface UserIntf {
  userId: string;
  name: string;
  surname: string;
  email: string;
  linkedIn?: string;
  biography?: string;
  location: string;
  jobTitle: string;
}

export interface User extends UserIntf {
  role: Role;
  status: string;
}
