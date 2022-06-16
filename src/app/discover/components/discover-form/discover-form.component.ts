import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class DiscoverFormComponent {
  loadingGenerate: boolean = false;
  subtitle: string =
    'A través de web scraping a diversas ofertas de trabajo, te recomendaremos el perfil profesional que mejor se ajuste a tus preferencias y que tenga las tecnologías de mayor demanda laboral a día de hoy.';
  discoverForm: FormGroup = this.fb.group({
    jobTitle: ['React.js Developer', [Validators.required]],
    location: ['Quito', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly ppService: ProfessionalProfilesService,
    private readonly alertService: AlertService,
    private readonly discoverService: DiscoverService
  ) {}

  discover() {
    if (this.discoverForm.invalid) {
      return;
    }
    const generateRequest: GeneratePPRequest = {
      jobTitle: this.discoverForm.get('jobTitle')?.value,
      location: this.discoverForm.get('location')?.value,
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
}
