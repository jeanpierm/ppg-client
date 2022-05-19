import { AbstractControl, ValidationErrors } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { User } from '../ppg/models/account/user';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_SUCCESS_MESSAGE } from './constants';

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

export function validateTwoFormControlsAreEquals(controlName1: string, controlName2: string) {
  return function (formGroup: AbstractControl): ValidationErrors | null {
    const control1 = formGroup.get(controlName1);
    const control2 = formGroup.get(controlName2);

    if (control2?.errors && !control2?.errors['doNotMatch']) {
      return null;
    }
    if (control1?.value !== control2?.value) {
      const errors = { doNotMatch: true };
      control2?.setErrors({ ...control2?.errors, ...errors });
      return errors;
    }
    control2?.setErrors(null);
    return null;
  };
}
