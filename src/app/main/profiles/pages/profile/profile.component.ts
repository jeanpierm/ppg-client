import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfessionalProfile;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly profileService: ProfessionalProfilesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.profileService.getById(id)))
      .subscribe(({ data }) => (this.profile = data));
  }
}
