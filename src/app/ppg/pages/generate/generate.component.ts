import { Component, OnInit } from '@angular/core';
import { SweetAlert } from 'src/app/ppg/config/sweetAlert';
import { ProfessionalProfilesService } from 'src/app/ppg/services/professional-profiles.service';
import { GeneratePpgRequest } from '../../models/profiles/generate-ppg';
import { ProfessionalProfile } from '../../models/profiles/professional-profile';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {
  static readonly PATH = 'generar';

  public generatePpg: GeneratePpgRequest;
  public loading: boolean = false;
  public displayedColumns: string[] = ['JobTitle', 'Location'];
  public ppGenerated: ProfessionalProfile;
  public alert: SweetAlert;

  constructor(public ppService: ProfessionalProfilesService) {
    this.generatePpg = new GeneratePpgRequest();
    this.loading = false;
    this.ppGenerated = new ProfessionalProfile();
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {
    this.ppService.loadProfessionalProfiles();
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
      this.alert.errorAlert('Llene todos lo campos');
      return;
    }

    this.loading = true;
    this.ppService.generate(this.generatePpg).subscribe({
      next: (res) => {
        this.ppGenerated = res.data;
        this.loading = false;
        this.alert.successAlert('Perfil profesional generado correctamente');
        this.ppService.loadProfessionalProfiles();
      },
      error: (err) => {
        this.ppGenerated = new ProfessionalProfile();
        this.loading = false;
        this.alert.errorAlert(err);
      },
    });
    this.ppService.loadProfessionalProfiles();
  }

  getRadomProfile() {
    this.loading = true;
    this.ppService.getRadomProfile().subscribe({
      next: (res) => {
        this.ppGenerated = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.ppGenerated = new ProfessionalProfile();
        this.loading = false;
      },
    });
  }
}
