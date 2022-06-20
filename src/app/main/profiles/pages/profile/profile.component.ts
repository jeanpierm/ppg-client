import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import {
  JobOffer,
  ProfessionalProfile,
} from '../../../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfessionalProfile;
  jobOffers: JobOffer[] = new Array(15).fill({
    company: 'Gizlo',
    title: 'Desarrollador Backend',
    link: 'https://google.com.ec',
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly profilesService: ProfessionalProfilesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.profilesService.getById(id)))
      .subscribe(({ data }) => (this.profile = data));
  }
}
