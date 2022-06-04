import { AbstractControl, ValidationErrors } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Account } from '../ppg/interfaces/account.interface';
import { DEFAULT_ERROR_TITLE } from './constants';
import { LocalStorageKeys } from './enums/local-storage-keys.enum';

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

export function showErrorAlert(title: string = DEFAULT_ERROR_TITLE, text?: string) {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
}

export function dialogAlert(text: string) {
  return Swal.fire({
    text,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
  });
}

export function isEmpty(s: string): boolean {
  if (!s) return true;
  return s.trim().length === 0;
}

export function setAccountDataInLocalStorage({ name, surname, email, options }: Account): void {
  localStorage.setItem(LocalStorageKeys.Name, name);
  localStorage.setItem(LocalStorageKeys.Surname, surname);
  localStorage.setItem(LocalStorageKeys.Email, email);
  localStorage.setItem(LocalStorageKeys.Options, JSON.stringify(options));
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

/**
 * Agrega un (1) día a una fecha
 */
export function incrementDate(date: Date | number | string, increment: number): Date {
  const incrementedDate = new Date(date);
  incrementedDate.setDate(incrementedDate.getDate() + increment);

  return incrementedDate;
}
