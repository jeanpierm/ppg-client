import { HttpErrorResponse } from '@angular/common/http';
import { Message } from './message';

export class ResponseConfig {
  msg: Message;
  constructor() {
    this.msg = new Message();
  }

  public handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
        return error.message
          ? `Not Found: ${error.message}`
          : this.msg.Response404;
      }

      case 403: {
        return error.message
          ? `Access Denied: ${error.message}`
          : this.msg.Response403;
      }

      case 500: {
        return error.message
          ? `Internal Server Error: ${error.message}`
          : this.msg.Response500;
      }

      default: {
        return error.message
          ? `Unknown Server Error: ${error.message}`
          : 'Ha ocurrido un error';
      }
    }
  }
}
