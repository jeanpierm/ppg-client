import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechType } from '../../interfaces/tech-type.interface';

@Component({
  selector: 'app-tech-type-dialog',
  templateUrl: './tech-type-dialog.component.html',
  styleUrls: ['./tech-type-dialog.component.scss'],
})
export class TechTypeDialogComponent implements OnInit {
  tForm: UntypedFormGroup = this.fb.group({
    techTypeId: '',
    name: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
    label: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type?: TechType },
    public dialogRef: MatDialogRef<TechTypeDialogComponent>,
    public fb: UntypedFormBuilder
  ) {
    if (data.type) {
      this.setFormValues(data.type);
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  setFormValues(type: TechType) {
    this.tForm.patchValue({
      techTypeId: type.techTypeId,
      name: type.name,
      label: type.label,
    });
  }
}
