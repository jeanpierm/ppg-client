import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { retry } from 'rxjs';
import { GeneratePPRequest } from '../../../account/interfaces/generate-pp.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';
import { AlertService } from '../../../core/services/alert.service';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-discover-form',
  templateUrl: './discover-form.component.html',
  styleUrls: ['./discover-form.component.scss'],
})
export class DiscoverFormComponent implements OnInit {
  tmpJobTitle: string = '';
  tmpLocation: string = '';
  loadingGenerate: boolean = false;
  useUserPreferences: boolean = false;
  subtitle: string =
    'A través de web scraping a diversas ofertas de trabajo, te recomendaremos el perfil profesional que mejor se ajuste a tus preferencias y que tenga las tecnologías de mayor demanda laboral a día de hoy.';
  discoverForm: FormGroup = this.fb.group({
    jobTitle: new FormControl('Node.js Developer', Validators.required),
    location: ['Quito', [Validators.required]],
  });

  get jobTitleControl() {
    return this.discoverForm.get('jobTitle');
  }

  get locationControl() {
    return this.discoverForm.get('location');
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly ppService: ProfessionalProfilesService,
    private readonly alertService: AlertService,
    private readonly discoverService: DiscoverService,
    private readonly spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  discover() {
    if (this.discoverForm.invalid) {
      return;
    }
    const generateRequest: GeneratePPRequest = {
      jobTitle: this.jobTitleControl?.value,
      location: this.locationControl?.value,
    };
    this.loadingGenerate = true;
    this.ppService
      .generate(generateRequest)
      .pipe(retry(3))
      .subscribe({
        next: ({ data }) => {
          this.loadingGenerate = false;
          this.discoverService.ppGenerated = data;
          this.alertService.success(
            '¡Perfil profesional generado exitosamente!'
          );
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
    const jobTitlePref = 'Backend Developer';
    const locationPref = 'Guayaquil';

    if (this.jobTitleControl?.value !== jobTitlePref) {
      this.tmpJobTitle = this.jobTitleControl?.value;
    }
    if (this.locationControl?.value !== locationPref) {
      this.tmpLocation = this.locationControl?.value;
    }

    if (this.useUserPreferences) {
      this.jobTitleControl?.disable();
      this.locationControl?.disable();
      this.jobTitleControl?.setValue(jobTitlePref);
      this.locationControl?.setValue(locationPref);
      return;
    }
    this.jobTitleControl?.enable();
    this.locationControl?.enable();
    this.jobTitleControl?.setValue(this.tmpJobTitle);
    this.locationControl?.setValue(this.tmpLocation);
  }
}
