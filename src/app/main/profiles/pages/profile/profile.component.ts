import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';
import { JobOffer } from '../../interfaces/job-offer.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfessionalProfile;
  jobOffers: JobOffer[] = new Array<JobOffer>(15).fill({
    company: {
      name: 'Gizlo',
      logoUrl:
        'https://www.gizlocorp.com/web/image/website/1/logo/Gizlo?unique=7d7b840',
    },
    title: 'Desarrollador Backend',
    url: 'https://google.com.ec',
    isRemote: true,
    location: 'Guayaquil, Ecuador',
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
