import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { LocalStorageKeys } from '../enums/local-storage-keys.enum';
import { showErrorAlert } from '../utils';
import { RouteInfo } from './interfaces/route-info.interface';
import { sidebarItems } from './sidebar-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  showMenu = false;
  options: RouteInfo[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setSidebarOptions();
  }

  setSidebarOptions() {
    console.log('hola');
    const optionsRaw = localStorage.getItem(LocalStorageKeys.Options);

    if (optionsRaw) {
      this.options = JSON.parse(optionsRaw);
      return;
    }

    Swal.fire({
      title: 'Ha ocurrido un error',
      text: 'No se encontraron funciones para su cuenta. Por favor, vuelva a iniciar sesión. Si el error persiste, póngase con en contacto con el administrador.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    this.authService.logout();
  }
}
