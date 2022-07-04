import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfilesService } from '../../services/profiles.service';
import { ProfileListComponent } from '../profile-list/profile-list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfessionalProfile;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly profilesService: ProfilesService,
    private readonly alertService: AlertService
  ) {}

  get profilesRoute() {
    return `/${ProfileListComponent.PATH}`;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.profilesService.getById(id)))
      .subscribe(({ data }) => (this.profile = data));
  }

  downloadPDF() {
    window.alert('Muy pronto!!');
  }

  deleteProfile() {
    this.alertService
      .warning('¿Está seguro de eliminar el perfil profesional?')
      .then((res) => {
        if (res.isConfirmed) {
          this.profilesService.delete(this.profile.ppId).subscribe({
            next: () => {
              this.alertService
                .success('Perfil profesional eliminado con éxito')
                .then(() => {
                  this.router.navigateByUrl(this.profilesRoute);
                });
            },
            error: () => {
              this.alertService.error();
            },
          });
        }
      });
  }
}
