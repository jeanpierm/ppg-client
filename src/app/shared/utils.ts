import Swal, { SweetAlertIcon } from 'sweetalert2';
import { User } from '../ppg/models/account/user';
import { DEFAULT_ERROR_MESSAGE } from './constants';

export function deleteObjectItemsByValue(object: Record<string, number>, value: number) {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (result[key] === value) delete result[key];
  });
  return result;
}

export function showAlert(title: string, icon?: SweetAlertIcon) {
  return Swal.fire({
    title,
    icon,
    confirmButtonText: 'Aceptar',
  });
}

export function showErrorAlert(title: string = DEFAULT_ERROR_MESSAGE) {
  return showAlert(title, 'error');
}

export function isEmpty(s: string): boolean {
  if (!s) return true;
  return s.trim().length === 0;
}

export function setUserDataInLocalStorage(user: User): void {
  localStorage.setItem('name', user.name);
  localStorage.setItem('surname', user.surname);
  localStorage.setItem('email', user.email);
}
