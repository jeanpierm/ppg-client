import { Role } from '../../core/enums/role.enum';

export interface CreateUserRequest {
  email: string;
  name: string;
  surname: string;
  password: string;
  jobTitle: string;
  location: string;
  biography?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  photo?: string;
  role?: Role;
}
