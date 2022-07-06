import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneratePPRequest } from '../../../account/interfaces/generate-pp.interface';
import { ProfilesService } from '../../services/profiles.service';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../../auth/services/auth.service';
import { getRandomFromArray } from '../../../../core/utils/object.util';
import { Router } from '@angular/router';
import { ProfileListComponent } from '../../pages/profile-list/profile-list.component';
import { map, Observable, startWith } from 'rxjs';
import { predefinedJobTitles } from '../../../../core/constants/job-titles.constant';
import { gyeLocation } from '../../../../core/constants/location.constant';
import { predefinedLocations } from '../../../../core/constants/locations.constant';

@Component({
  selector: 'app-discover-form',
  templateUrl: './discover-form.component.html',
  styleUrls: ['./discover-form.component.scss'],
})
export class DiscoverFormComponent implements OnInit {
  filteredJobTitles!: Observable<string[]>;
  filteredLocations!: Observable<string[]>;
  tmpJobTitle: string = '';
  tmpLocation: string = '';
  loadingGenerate: boolean = false;
  today: Date = new Date();
  todayFormatted: string = `${this.today.getDate()}/${this.today.getMonth()}/${this.today.getFullYear()}`;
  subtitle: string = `A través de web scraping a diversas ofertas de trabajo en tiempo real, te recomendaremos el perfil profesional que mejor se ajuste a tus preferencias y que tenga las tecnologías de desarrollo de software con mayor demanda laboral a día de hoy (${this.todayFormatted}).`;
  discoverForm: FormGroup = this.fb.group({
    jobTitle: ['', [Validators.required]],
    location: ['', [Validators.required]],
    useUserPreferences: [true],
  });

  get jobTitleControl() {
    return this.discoverForm.get('jobTitle');
  }

  get locationControl() {
    return this.discoverForm.get('location');
  }

  get useUserPrefControl() {
    return this.discoverForm.get('useUserPreferences');
  }

  get isInCooldown(): boolean {
    if (!this.ppService.lastProfileGeneration) return false;
    const nowTime = new Date().getTime();
    const unlockTime =
      this.ppService.lastProfileGeneration.getTime() +
      ProfilesService.GENERATE_COOLDOWN_TIME;
    return nowTime < unlockTime;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly ppService: ProfilesService,
    private readonly alertService: AlertService,
    private readonly spinner: NgxSpinnerService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.authService.validateToken().subscribe((isAuth) => {
      if (isAuth) this.onChangeUseUserPreferences();
    });
    this.filteredJobTitles = this.jobTitleControl!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', predefinedJobTitles))
    );
    this.filteredLocations = this.locationControl!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', predefinedLocations))
    );
  }

  private _filter(value: string, values: string[]): string[] {
    const filterValue = value.toLowerCase();

    return values.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  discover() {
    const generateRequest: GeneratePPRequest = {
      jobTitle: this.jobTitleControl?.value,
      location: this.locationControl?.value,
    };
    this.generateProfessionalProfile(generateRequest);
  }

  discoverRandom() {
    const generateRequest: GeneratePPRequest = {
      jobTitle: getRandomFromArray(predefinedJobTitles) as string,
      location: gyeLocation,
    };
    this.generateProfessionalProfile(generateRequest);
  }

  generateProfessionalProfile(generateRequest: GeneratePPRequest) {
    if (this.discoverForm.invalid) {
      return;
    }
    this.loadingGenerate = true;
    this.ppService.generate(generateRequest).subscribe({
      next: ({ data }) => {
        this.loadingGenerate = false;
        this.alertService
          .success('¡Perfil profesional generado exitosamente!')
          .then(() => {
            this.router.navigate([`/${ProfileListComponent.PATH}`, data.ppId]);
          });
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          this.loadingGenerate = false;
          this.alertService.error();
        }
      },
    });
  }

  onChangeUseUserPreferences() {
    const jobTitlePref = this.authService.authAccount?.jobTitle;
    const locationPref = this.authService.authAccount?.location;
    if (this.jobTitleControl?.value !== jobTitlePref) {
      this.tmpJobTitle = this.jobTitleControl?.value;
    }
    if (this.locationControl?.value !== locationPref) {
      this.tmpLocation = this.locationControl?.value;
    }

    if (this.useUserPrefControl?.value) {
      this.jobTitleControl?.disable();
      this.locationControl?.disable();
      this.jobTitleControl?.setValue(jobTitlePref);
      this.locationControl?.setValue(locationPref);
    } else {
      this.jobTitleControl?.enable();
      this.locationControl?.enable();
      this.jobTitleControl?.setValue(this.tmpJobTitle);
      this.locationControl?.setValue(this.tmpLocation);
    }
  }
}
