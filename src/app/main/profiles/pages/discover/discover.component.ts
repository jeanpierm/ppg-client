import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ProfileListComponent } from '../profile-list/profile-list.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  static readonly PATH = 'discover';

  today: Date = new Date();
  todayFormatted: string = `${this.today.getDate()}/${this.today.getMonth()}/${this.today.getFullYear()}`;
  lastProfiles: ProfessionalProfile[] = [];
  loadingLastProfiles: boolean = true;

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly profilesService: ProfessionalProfilesService
  ) {}

  get profilesRoute() {
    return `/${ProfileListComponent.PATH}`;
  }

  ngOnInit(): void {
    this.validateUserIsAuthenticated().subscribe((isAuth) => {
      if (!isAuth) return;
      this.loadLastProfiles();
    });
  }

  loadLastProfiles() {
    this.loadingLastProfiles = true;
    this.profilesService
      .get()
      // TODO: HACER PAGINACIÓN DESDE BACK
      .subscribe(({ data }) => {
        this.lastProfiles = data.slice(0, 3);
        this.loadingLastProfiles = false;
      });
  }

  private validateUserIsAuthenticated() {
    return this.authService.validateAndRefreshToken().pipe(
      tap((isAuth) => {
        if (isAuth) return;
        this.alertService
          .simple({
            title: '¡Espera!',
            text: 'Antes de poder descubrir y gestionar los perfiles profesionales más demandados de hoy, debes iniciar sesión.',
            icon: 'info',
          })
          .then(() => {
            this.authService.logout();
          });
      })
    );
  }
}
