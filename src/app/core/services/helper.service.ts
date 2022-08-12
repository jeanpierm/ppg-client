import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  statusResolver(value: string) {
    return handleStatus[value] || 'Indefinido';
  }
}
const handleStatus = {
  I: 'Inactivo',
  A: 'Activo',
};
