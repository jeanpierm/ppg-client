export interface Role {
  roleId: string;
  name: string;
  options: Option[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Option {
  icon?: string;
  title: string;
  path: string;
}
