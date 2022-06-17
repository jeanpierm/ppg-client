import { Injectable } from '@angular/core';
import { ProfessionalProfile } from '../../account/interfaces/professional-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService {
  ppGenerated!: ProfessionalProfile;

  constructor() {}
}
