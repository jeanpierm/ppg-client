import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../core/services/alert.service';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfileListComponent } from '../../pages/profile-list/profile-list.component';
import { ProfilesService } from '../../services/profiles.service';
import { getTechnologyNames } from '../../utils/get-technology-names.util';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  @Input() profile!: ProfessionalProfile;
  @Output() reLoad: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly professionalProfileService: ProfilesService,
    private readonly alertService: AlertService
  ) {}

  get profileByIdRoute() {
    return `/${ProfileListComponent.PATH}/${this.profile.ppId}`;
  }

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

  remove() {
    this.alertService
      .warning('¿Está seguro de eliminar el perfil profesional?')
      .then((result) => {
        if (result.isConfirmed) {
          this.professionalProfileService.delete(this.profile.ppId).subscribe({
            next: () => {
              this.alertService.success(
                'Perfil profesional eliminado exitosamente'
              );
              this.reLoad.emit(true);
            },
            error: (err) => {
              if (err instanceof HttpErrorResponse) {
                this.alertService.error();
              }
            },
          });
        }
      });
  }
}
