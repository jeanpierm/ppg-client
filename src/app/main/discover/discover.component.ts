import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';
import { AccountComponent } from '../account/account.component';
import { ProfilesComponent } from '../account/pages/profiles/profiles.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  static readonly PATH = 'descubrir';

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}

  get accountProfilesRoute() {
    return `/${AccountComponent.PATH}/${ProfilesComponent.PATH}`;
  }

  ngOnInit(): void {
    this.validateUserIsAuthenticated();
  }

  private validateUserIsAuthenticated() {
    this.authService.validateAnRefreshToken().subscribe((isAuth) => {
      if (isAuth) return;
      this.alertService
        .simple({
          title: '¡Espera!',
          text: 'Antes de poder descubrir y gestionar los perfiles profesionales más demandados de hoy, debes iniciar sesión.',
          icon: 'info',
        })
        .then(() => {
          this.router.navigateByUrl(`/${LoginComponent.PATH}`);
        });
    });
  }
}
