import { Component, OnInit } from '@angular/core';
import { SweetAlert } from 'src/app/ppg/config/sweetAlert';
import { ProfessionalProfilesService } from 'src/app/ppg/services/professional-profiles.service';
import { ProfessionalProfile } from '../../models/profiles/professional-profile';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneratePpgRequest } from '../../interfaces/generate-pp.interface';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {
  static readonly PATH = 'generar-perfil';

  displayedColumns: string[] = ['JobTitle', 'Location'];
  alert: SweetAlert;
  generatePpg: GeneratePpgRequest = {
    jobTitle: '',
    location: '',
  };
  loadingGenerate: boolean = false;
  ppGenerated!: ProfessionalProfile;

  constructor(public ppService: ProfessionalProfilesService, private spinner: NgxSpinnerService) {
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  get professionalProfiles(): ProfessionalProfile[] {
    return this.ppService.professionalProfiles;
  }

  // get ppGenerated() {
  //   return this.ppService.ppGenerated;
  // }

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
      this.alert.errorAlert('Llene todos lo campos');
      return;
    }

    this.loadingGenerate = true;
    this.ppService.generate(this.generatePpg).subscribe({
      next: (res) => {
        this.loadingGenerate = false;
        this.ppGenerated = res.data;
        this.alert.successAlert('Perfil profesional generado correctamente');
      },
      error: (err) => {
        this.loadingGenerate = false;
        this.alert.errorAlert(err);
      },
    });

    // this.ppService.loadGenerate(this.generatePpg);
    // this.ppService.loadProfessionalProfiles();
  }
}
