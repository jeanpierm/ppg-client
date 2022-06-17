import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ppg-frontend';

  constructor(private readonly router: Router) {}

  get isAdminPage() {
    return this.router.url.includes('/admin');
  }
}
