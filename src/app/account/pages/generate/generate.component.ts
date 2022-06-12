import { Component, OnInit } from '@angular/core';
import { ProfessionalProfile } from '../../interfaces/professional-profile.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneratePPRequest } from '../../interfaces/generate-pp.interface';
import { ProfessionalProfilesService } from '../../services/professional-profiles.service';
import { retry } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {
  static readonly PATH = 'generar-perfil';

  displayedColumns: string[] = ['JobTitle', 'Location'];
  generatePpg: GeneratePPRequest = {
    jobTitle: '',
    location: '',
  };
  loadingGenerate: boolean = false;
  ppGenerated!: ProfessionalProfile;

  constructor(
    public ppService: ProfessionalProfilesService,
    private spinner: NgxSpinnerService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  get professionalProfiles(): ProfessionalProfile[] {
    return this.ppService.professionalProfiles;
  }

  isValidForm() {
    if (this.generatePpg.jobTitle.toString().trim().length === 0) {
      return false;
    }

    if (this.generatePpg.location.toString().trim().length === 0) {
      return false;
    }

    return true;
  }

  generate() {
    if (!this.isValidForm()) {
      this.alertService.error('Llene todos lo campos');
      return;
    }

    this.loadingGenerate = true;
    this.ppService
      .generate(this.generatePpg)
      .pipe(retry(3))
      .subscribe({
        next: (res) => {
          this.loadingGenerate = false;
          this.ppGenerated = res.data;
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
