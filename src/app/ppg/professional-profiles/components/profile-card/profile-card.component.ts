import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SweetAlert } from 'src/app/ppg/config/sweetAlert';
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
  public alert: SweetAlert;

  constructor(
    private readonly professionalProfileService: ProfessionalProfilesService
  ) {
    this.alert = new SweetAlert();
  }

  delete(id: String) {
    this.alert
      .dialogAlert('Esta seguro de eliminar este perfil profesional?')
      .then((result) => {
        if (result.isConfirmed) {
          this.professionalProfileService.delete(id).subscribe({
            next: (_) => {
              this.alert.successAlert('Se ha eliminado correctamente');
              this.reLoad.emit(true);
            },
            error: (err) => this.alert.errorAlert(err),
          });
        }
      });
  }
}
