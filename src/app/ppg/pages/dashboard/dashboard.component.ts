import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  static readonly PATH = 'dashboard';
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Framewoks', id: 1 },
          { title: 'Lenguajes', id: 2 },
          { title: 'Base de datos', id: 3 },
          { title: 'Herramientas', id: 4 },
        ];
      }

      return [
        { title: 'Framewoks', id: 1 },
        { title: 'Lenguajes', id: 2 },
        { title: 'Base de datos', id: 3 },
        { title: 'Herramientas', id: 4 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
