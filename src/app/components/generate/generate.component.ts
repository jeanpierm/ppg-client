import { Component, OnInit } from '@angular/core';
import { SweetAlert } from 'src/app/config/sweetAlert';
import { GeneratePpgRequest } from 'src/app/models/generate-ppg';
import { ProfessionalProfile } from 'src/app/models/professional-profile';
import { ProfessionalProfilesService } from 'src/app/services/professional-profiles.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {
  public generatePpg: GeneratePpgRequest;
  public loading: boolean = false;
  public displayedColumns: string[] = ['JobTitle', 'Location'];
  public professionalProfile: ProfessionalProfile;
  public alert: SweetAlert;

  constructor(public ppService: ProfessionalProfilesService) {
    this.generatePpg = new GeneratePpgRequest();
    this.loading = false;
    this.professionalProfile = new ProfessionalProfile();
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {
    this.ppService.loadProfessionalProfiles();
  }

  get professionalProfiles(): ProfessionalProfile[] {
    return [...this.ppService.professionalProfiles];
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
        this.professionalProfile = res.data;
        this.loading = false;
        this.alert.sucessAlert('Perfil profesional generado correctamente');
      },
      error: (err) => {
        this.professionalProfile = new ProfessionalProfile();
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
        this.professionalProfile = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.professionalProfile = new ProfessionalProfile();
        this.loading = false;
      },
    });
  }
}
