import { Account } from '../../../admin/interfaces/account.interface';

export interface LoginResponse {
  accessToken: string;
  accountData: Account;
}
