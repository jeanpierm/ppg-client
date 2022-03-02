import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  showMenu = false;
  routes = ROUTES;
  constructor() {}

  ngOnInit(): void {}
}
