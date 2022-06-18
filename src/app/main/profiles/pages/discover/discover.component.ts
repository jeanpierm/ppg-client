import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { AccountComponent } from '../../../account/account.component';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfilesComponent } from '../../../account/pages/profiles/profiles.component';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';
import { LoginComponent } from '../../../auth/pages/login/login.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  static readonly PATH = 'descubrir';

  lastProfiles: ProfessionalProfile[] = [];

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly profilesService: ProfessionalProfilesService
  ) {}

  get accountProfilesRoute() {
    return `/${AccountComponent.PATH}/${ProfilesComponent.PATH}`;
  }

  ngOnInit(): void {
    this.validateUserIsAuthenticated().subscribe((isAuth) => {
      if (!isAuth) return;
      this.loadLastProfiles();
    });
  }

  loadLastProfiles() {
    this.profilesService
      .get()
      // TODO: HACER PAGINACIÓN DESDE BACK
      .subscribe(({ data }) => (this.lastProfiles = data.slice(0, 3)));
  }

  private validateUserIsAuthenticated() {
    return this.authService.validateAnRefreshToken().pipe(
      tap((isAuth) => {
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
      })
    );
  }
}
