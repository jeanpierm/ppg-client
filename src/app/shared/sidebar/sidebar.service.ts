import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './interfaces/route-info.interface';
import { sidebarItems } from './sidebar-items';

@Injectable({
  providedIn: 'root',
})
export class VerticalSidebarService {
  private readonly MENUITEMS: RouteInfo[] = sidebarItems;

  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;

  items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);

  constructor() {}
}
