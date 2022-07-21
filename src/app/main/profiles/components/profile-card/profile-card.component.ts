import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../core/services/alert.service';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfileListComponent } from '../../pages/profile-list/profile-list.component';
import { ProfilesService } from '../../services/profiles.service';

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

  remove() {
    this.alertService
      .warning('¿Está seguro de eliminar el perfil profesional?')
      .then((result) => {
        if (result.isConfirmed) {
          this.professionalProfileService.delete(this.profile.ppId).subscribe({
            next: () => {
              this.alertService.success({
                title: 'Perfil profesional eliminado exitosamente',
              });
              this.reLoad.emit(true);
            },
            error: (err) => {
              if (err instanceof HttpErrorResponse) {
                this.alertService.error({});
              }
            },
          });
        }
      });
  }
}
