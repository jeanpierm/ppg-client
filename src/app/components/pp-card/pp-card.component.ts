import { Component, Input } from '@angular/core';
import { ProfessionalProfile } from 'src/app/models/professional-profile';

@Component({
  selector: 'app-pp-card',
  templateUrl: './pp-card.component.html',
  styles: [],
})
export class PpCardComponent {
  @Input() professionalProfile!: ProfessionalProfile;
}
