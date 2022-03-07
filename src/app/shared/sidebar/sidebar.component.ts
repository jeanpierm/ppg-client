import { Component, OnInit } from '@angular/core';
import { sidebarItems } from './sidebar-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  showMenu = false;
  routes = sidebarItems;
  constructor() {}
}
