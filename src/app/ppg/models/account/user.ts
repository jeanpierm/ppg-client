export class User {
  constructor(
    public userId: string = '',
    public email: string = '',
    public surname: string = '',
    public name: string = '',
    public roles: Array<string> = [],
    public status: string = ''
  ) {}
}
