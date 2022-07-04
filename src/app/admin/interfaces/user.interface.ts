import { Role } from './role.interface';

export interface UserIntf {
  userId: string;
  name: string;
  surname: string;
  email: string;
  location: string;
  jobTitle: string;
  linkedIn?: string;
  photo?: string;
  biography?: string;
  portfolio?: string;
  github?: string;
}

export interface User extends UserIntf {
  role: Role;
  status: string;
  createdAt: string;
  updatedAt: string;
}
