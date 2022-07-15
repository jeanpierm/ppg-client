import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { RoutesService } from '../../../../core/services/routes.service';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfilesService } from '../../services/profiles.service';
import { getTechnologyNames } from '../../utils/get-technology-names.util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfessionalProfile;
  generatingPDF: boolean = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly profilesService: ProfilesService,
    private readonly alertService: AlertService,
    public readonly routesService: RoutesService
  ) {}

  get languages() {
    return getTechnologyNames(this.profile, 'language');
  }

  get databases() {
    return getTechnologyNames(this.profile, 'database');
  }

  get frameworks() {
    return getTechnologyNames(this.profile, 'framework');
  }

  get libraries() {
    return getTechnologyNames(this.profile, 'library');
  }

  get tools() {
    return getTechnologyNames(this.profile, 'tool');
  }

  get patterns() {
    return getTechnologyNames(this.profile, 'pattern');
  }

  get paradigms() {
    return getTechnologyNames(this.profile, 'paradigm');
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.profilesService.getById(id)))
      .subscribe(({ data }) => (this.profile = data));
  }

  downloadResume() {
    this.generatingPDF = true;
    this.profilesService.download(this.profile.ppId).subscribe({
      next: (blob) => {
        this.generatingPDF = false;
        const file = new Blob([blob], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank', 'width=1000, height=800');
      },
      error: (err) => {
        this.generatingPDF = false;
        console.error(err);
      },
    });
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
                  this.router.navigateByUrl(this.routesService.profilesRoute);
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
