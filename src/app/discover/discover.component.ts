import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfessionalProfile } from '../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../account/services/professional-profiles.service';
import { AlertService } from '../core/services/alert.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  static readonly PATH = 'descubrir';

  ppGenerated!: ProfessionalProfile;

  constructor(
    private readonly ppService: ProfessionalProfilesService,
    private readonly spinner: NgxSpinnerService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
  }
}
