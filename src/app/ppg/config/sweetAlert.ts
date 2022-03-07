import Swal from 'sweetalert2';
import { Message } from './message';

export class SweetAlert {
  private msg: Message;

  constructor() {
    this.msg = new Message();
  }

  alert(type: String, text?: any) {
    if (type == 'success') {
      return this.successAlert(text);
    } else if (type == 'error') {
      return this.errorAlert(text);
    }
  }

  successAlert(text: any) {
    if (text == null) text = this.msg.success;

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
}
