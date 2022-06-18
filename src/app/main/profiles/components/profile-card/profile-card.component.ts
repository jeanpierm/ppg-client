import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../core/services/alert.service';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';
import { ProfileListComponent } from '../../pages/profile-list/profile-list.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styles: [],
})
export class ProfileCardComponent {
  @Input() profile!: ProfessionalProfile;
  @Output() reLoad: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly professionalProfileService: ProfessionalProfilesService,
    private readonly alertService: AlertService
  ) {}

  get profileByIdRoute() {
    return `/${ProfileListComponent.PATH}/${this.profile.ppId}`;
  }

  remove() {
    this.alertService
      .warning('Esta seguro de eliminar este perfil profesional?')
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