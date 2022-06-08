import Swal from 'sweetalert2';
import { genericMessages } from '../../core/constants/generic-messages.constant';
export class SweetAlert {
  alert(type: string, text?: any) {
    if (type == 'success') {
      return this.successAlert(text);
    } else if (type == 'error') {
      return this.errorAlert(text);
    }
  }

  successAlert(text: any) {
    if (text == null) text = genericMessages.success;

    Swal.fire({
      icon: 'success',
      text: text,
      confirmButtonText: 'Aceptar',
    });
  }

  errorAlert(text?: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      confirmButtonText: 'Aceptar',
    });
  }

  dialogAlert(text: any) {
    return Swal.fire({
      text: text,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    });
  }
}
