import { Role } from './role.interface';

export interface UserIntf {
  userId: string;
  name: string;
  surname: string;
  email: string;
  linkedIn?: string;
  photo?: string;
  biography?: string;
  portfolio?: string;
  github?: string;
  location: string;
  jobTitle: string;
}

export interface User extends UserIntf {
  role: Role;
  status: string;
}
