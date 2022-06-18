import { Component, OnInit } from '@angular/core';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  static readonly PATH = 'perfiles';

  profiles: ProfessionalProfile[] = [];

  constructor(private readonly profilesService: ProfessionalProfilesService) {}

  ngOnInit(): void {
    this.profilesService.get().subscribe(({ data }) => (this.profiles = data));
  }
}
