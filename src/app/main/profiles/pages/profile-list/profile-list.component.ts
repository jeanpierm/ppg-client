import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { incrementDate } from '../../../../core/utils/date.util';
import { GetProfessionalProfilesQuery } from '../../../account/interfaces/get-professional-profiles-query.interface';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  static readonly PATH = 'profiles';

  profiles: ProfessionalProfile[] = [];
  profilesForm = this.fb.group({
    jobTitle: [''],
    location: [''],
    initDate: [this.todayMinus30Days],
    endDate: [this.today],
  });
  loadingProfiles: boolean = true;

  get todayMinus30Days(): Date {
    return new Date(this.today.setDate(this.today.getDate() - 30));
  }

  get today(): Date {
    return new Date();
  }

  get jobTitleControl() {
    return this.profilesForm.get('jobTitle');
  }

  get locationControl() {
    return this.profilesForm.get('location');
  }

  get initDateControl() {
    return this.profilesForm.get('initDate');
  }

  get endDateControl() {
    return this.profilesForm.get('endDate');
  }

  constructor(
    private readonly profilesService: ProfilesService,
    private readonly fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.searchProfiles();
    this.profilesForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(({ jobTitle, location, initDate, endDate }) => {
        this.searchProfiles({
          jobTitle,
          location,
          initDate: initDate?.toISOString(),
          endDate: incrementDate(endDate, 1)?.toISOString(),
        });
      });
  }

  searchProfiles(getProfessionalProfilesQuery?: GetProfessionalProfilesQuery) {
    this.loadingProfiles = true;
    this.profilesService
      .get(getProfessionalProfilesQuery)
      .subscribe(({ data }) => {
        this.profiles = data;
        this.loadingProfiles = false;
      });
  }

  clearDates() {
    this.initDateControl?.setValue(null);
    this.endDateControl?.setValue(null);
  }
}
