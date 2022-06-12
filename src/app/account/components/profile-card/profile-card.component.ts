import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';
import { ProfessionalProfile } from '../../interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../services/professional-profiles.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styles: [],
})
export class ProfileCardComponent {
  @Input() professionalProfile!: ProfessionalProfile;
  @Output() reLoad: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly professionalProfileService: ProfessionalProfilesService,
    private readonly alertService: AlertService
  ) {}

  delete(id: String) {
    this.alertService
      .alert('Esta seguro de eliminar este perfil profesional?')
      .then((result) => {
        if (result.isConfirmed) {
          this.professionalProfileService.delete(id).subscribe({
            next: (_) => {
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
