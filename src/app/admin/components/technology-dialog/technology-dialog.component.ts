import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { techTypeOptions } from '../../../core/constants/technology-type-options.constant';
import { Technology } from '../../interfaces/technology.interface';

@Component({
  selector: 'app-technology-dialog',
  templateUrl: './technology-dialog.component.html',
  styleUrls: ['./technology-dialog.component.scss'],
})
export class TechnologyDialogComponent {
  myForm: FormGroup = this.fb.group({
    technologyId: '',
    name: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
    type: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
    identifiers: this.fb.array(
      [this.fb.control('', Validators.required)],
      [this.minLength(1)]
    ),
  });
  types = techTypeOptions;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { technology?: Technology },
    public dialogRef: MatDialogRef<TechnologyDialogComponent>,
    public fb: FormBuilder
  ) {
    if (data.technology) {
      this.setFormValue(data.technology);
    }
  }

  get identifiers() {
    return this.myForm.get('identifiers') as FormArray;
  }

  setFormValue(technology: Technology) {
    this.myForm.patchValue({
      technologyId: technology.technologyId,
      name: technology.name,
      type: technology.type,
    });
    this.myForm.setControl(
      'identifiers',
      this.fb.array(technology.identifiers || [])
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addIdentifier() {
    if (this.identifiers.length > 9) {
      return;
    }
    this.identifiers.push(this.fb.control('', Validators.required));
  }

  deleteIdentifier(i: number) {
    this.identifiers.removeAt(i);
  }

  minLength(min: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length < min ? { minLength: true } : null;
    };
  }
}
