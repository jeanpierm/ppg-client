import { Component, Input } from '@angular/core';
import { ProfessionalProfile } from 'src/app/ppg/models/profiles/professional-profile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styles: [],
})
export class ProfileCardComponent {
  @Input() professionalProfile!: ProfessionalProfile;
}
