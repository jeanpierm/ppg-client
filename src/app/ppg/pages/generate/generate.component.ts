import { Component, OnInit } from '@angular/core';
import { SweetAlert } from 'src/app/ppg/config/sweetAlert';
import { ProfessionalProfilesService } from 'src/app/ppg/services/professional-profiles.service';
import { GeneratePpgRequest } from '../../models/profiles/generate-ppg';
import { ProfessionalProfile } from '../../models/profiles/professional-profile';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {
  static readonly PATH = 'generar';

  public generatePpg: GeneratePpgRequest;
  public displayedColumns: string[] = ['JobTitle', 'Location'];
  public alert: SweetAlert;

  constructor(
    public ppService: ProfessionalProfilesService,
    private spinner: NgxSpinnerService
  ) {
    this.generatePpg = new GeneratePpgRequest();
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.ppService.loadProfessionalProfiles();
  }

  get professionalProfiles(): ProfessionalProfile[] {
    return this.ppService.professionalProfiles;
  }

  get loading() {
    return this.ppService.fetchLoading;
  }

  get ppGenerated() {
    return this.ppService.ppGenerated;
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
      this.alert.errorAlert('Llene todos lo campos');
      return;
    }

    this.ppService.loadGenerate(this.generatePpg);
    this.ppService.loadProfessionalProfiles();
  }
}
