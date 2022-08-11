import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { UpdateDownloadPreferences } from '../../interfaces/update-download-preferences.interface';
import { DownloadPreferencesService } from '../../services/download-preferences.service';

@Component({
  selector: 'app-edit-download',
  templateUrl: './edit-download.component.html',
  styleUrls: ['./edit-download.component.scss'],
})
export class EditDownloadComponent implements OnInit {
  static readonly PATH = 'edit-download';

  submitting: boolean = false;
  loadingData: boolean = true;
  form: UntypedFormGroup = this.fb.group({
    photo: [false],
    email: [false],
    biography: [false],
    linkedIn: [false],
    github: [false],
    portfolio: [false],
  });

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly dpService: DownloadPreferencesService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadAccountDataInForm();
  }

  loadAccountDataInForm() {
    this.loadingData = true;
    this.dpService.get().subscribe(({ data }) => {
      this.form.setValue({
        photo: data.photo,
        email: data.email,
        biography: data.biography,
        linkedIn: data.linkedIn,
        github: data.github,
        portfolio: data.portfolio,
      });
      this.loadingData = false;
    });
  }

  updateDownloadProfile() {
    this.submitting = true;
    const requestBody: UpdateDownloadPreferences = {
      photo: this.form.value.photo,
      email: this.form.value.email,
      biography: this.form.value.biography,
      linkedIn: this.form.value.linkedIn,
      github: this.form.value.github,
      portfolio: this.form.value.portfolio,
    };
    this.dpService.patch(requestBody).subscribe({
      next: () => {
        this.submitting = false;
        this.alertService.success({
          title: 'Preferencias actualizadas con éxito',
        });
      },
      error: (err) => {
        this.submitting = false;
        if (err instanceof HttpErrorResponse) {
          this.alertService.error();
        }
      },
    });
  }

  cancel() {
    location.reload();
  }
}
