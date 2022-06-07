import Swal, { SweetAlertIcon } from 'sweetalert2';
import { DEFAULT_ERROR_TITLE } from '../constants/alert.constants';

export function showAlert(title: string, icon?: SweetAlertIcon) {
  return Swal.fire({
    title,
    icon,
    confirmButtonText: 'Aceptar',
  });
}

export function showErrorAlert(
  title: string = DEFAULT_ERROR_TITLE,
  text?: string
) {
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
