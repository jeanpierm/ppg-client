import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { retry } from 'rxjs';
import { GeneratePPRequest } from '../../../account/interfaces/generate-pp.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../../auth/services/auth.service';
import { getRandomFromArray } from '../../../../core/utils/object.util';
import { Router } from '@angular/router';
import { ProfileListComponent } from '../../pages/profile-list/profile-list.component';

@Component({
  selector: 'app-discover-form',
  templateUrl: './discover-form.component.html',
  styleUrls: ['./discover-form.component.scss'],
})
export class DiscoverFormComponent implements OnInit {
  readonly GYE_LOCATION = 'Guayaquil, Ecuador';
  readonly PREDEFINED_JOB_TITLES = [
    'Software Developer',
    'Backend Developer',
    'Frontend Developer',
    'Web Developer',
    'Movil Developer',
    'Software Engineer',
  ];
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

  // TODO: Esto podría ser mejor
  get isInCooldown(): boolean {
    if (!this.ppService.lastProfileGeneration) return false;
    const now = new Date().getTime();
    return (
      this.ppService.lastProfileGeneration <
      new Date(now + this.ppService.GENERATE_COOLDOWN_TIME)
    );
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly ppService: ProfessionalProfilesService,
    private readonly alertService: AlertService,
    private readonly spinner: NgxSpinnerService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    if (!this.authService.authAccount) {
      this.authService.validateAnRefreshToken().subscribe(() => {
        this.onChangeUseUserPreferences();
      });
    } else {
      this.onChangeUseUserPreferences();
    }
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
      jobTitle: getRandomFromArray(this.PREDEFINED_JOB_TITLES) as string,
      location: this.GYE_LOCATION,
    };
    this.generateProfessionalProfile(generateRequest);
  }

  generateProfessionalProfile(generateRequest: GeneratePPRequest) {
    if (this.discoverForm.invalid) {
      return;
    }
    this.loadingGenerate = true;
    this.ppService
      .generate(generateRequest)
      .pipe(retry(3))
      .subscribe({
        next: ({ data }) => {
          this.loadingGenerate = false;
          this.alertService
            .success('¡Perfil profesional generado exitosamente!')
            .then(() => {
              this.router.navigate([
                `/${ProfileListComponent.PATH}`,
                data.ppId,
              ]);
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
