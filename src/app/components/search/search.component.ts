import { Component, OnInit } from '@angular/core';
import { SweetAlert } from 'src/app/config/sweetAlert';
import { GeneratePpgRequest } from 'src/app/models/generate-ppg';
import { ProfessionalProfile } from 'src/app/models/professional-profile';
import { ProfessionalProfileService } from 'src/app/services/professional-profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public generatePpg: GeneratePpgRequest;
  public loading: boolean;
  public professionalProfiles: Array<ProfessionalProfile>;
  displayedColumns: string[] = ['JobTitle', 'Location'];
  public professionalProfile: ProfessionalProfile;
  public alert: SweetAlert;

  constructor(public professionalProfileService: ProfessionalProfileService) {
    this.generatePpg = new GeneratePpgRequest();
    this.loading = false;
    this.professionalProfiles = [];
    this.professionalProfile = new ProfessionalProfile();
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getProfessionalProfiles().then(
      (res) => (this.loading = false),
      (err) => (this.loading = false)
    );
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
    this.professionalProfileService.generate(this.generatePpg).subscribe({
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
    this.getProfessionalProfiles();
  }

  getRadomProfile() {
    this.loading = true;
    this.professionalProfileService.getRadomProfile().subscribe({
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

  getProfessionalProfiles() {
    return new Promise((resolve, reject) => {
      this.professionalProfileService.getProfessionalProfiles().subscribe({
        next: (res) => {
          this.professionalProfiles = res.data;
          resolve(true);
        },
        error: (err) => {
          this.professionalProfiles = [];
          reject(err);
        },
      });
    });
  }
}
