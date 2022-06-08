import { Account } from '../../ppg/users/interfaces/account.interface';
import { LocalStorageKeys } from '../enums/local-storage-keys.enum';

export function setAccountDataInLocalStorage({
  name,
  surname,
  email,
  options,
}: Account): void {
  localStorage.setItem(LocalStorageKeys.Name, name);
  localStorage.setItem(LocalStorageKeys.Surname, surname);
  localStorage.setItem(LocalStorageKeys.Email, email);
  localStorage.setItem(LocalStorageKeys.Options, JSON.stringify(options));
}
