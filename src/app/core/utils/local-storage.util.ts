import { Account } from '../../admin/interfaces/account.interface';
import { LocalStorageKeys } from '../enums/local-storage-keys.enum';

export function setAccountDataInLocalStorage({
  userId,
  name,
  surname,
  email,
  location,
  jobTitle,
  options,
}: Account): void {
  localStorage.setItem(LocalStorageKeys.UserId, userId);
  localStorage.setItem(LocalStorageKeys.Name, name);
  localStorage.setItem(LocalStorageKeys.Surname, surname);
  localStorage.setItem(LocalStorageKeys.Email, email);
  localStorage.setItem(LocalStorageKeys.Location, location);
  localStorage.setItem(LocalStorageKeys.JobTitle, jobTitle);
  localStorage.setItem(LocalStorageKeys.Email, email);
  localStorage.setItem(LocalStorageKeys.Options, JSON.stringify(options));
}

export function getAccountDataFromLocalStorage(): Account | null {
  const userId = localStorage.getItem(LocalStorageKeys.UserId);
  const name = localStorage.getItem(LocalStorageKeys.Name);
  const surname = localStorage.getItem(LocalStorageKeys.Surname);
  const email = localStorage.getItem(LocalStorageKeys.Email);
  const location = localStorage.getItem(LocalStorageKeys.Location);
  const jobTitle = localStorage.getItem(LocalStorageKeys.JobTitle);
  const options = JSON.parse(
    localStorage.getItem(LocalStorageKeys.Options) || '[]'
  );

  if (
    userId &&
    name &&
    surname &&
    email &&
    location &&
    jobTitle &&
    options.length
  ) {
    return { userId, name, surname, email, location, jobTitle, options };
  }
  return null;
}
