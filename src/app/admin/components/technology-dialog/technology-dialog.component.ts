import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechType } from '../../interfaces/tech-type.interface';
import { Technology } from '../../interfaces/technology.interface';
import { TechTypesService } from '../../services/tech-types.service';

@Component({
  selector: 'app-technology-dialog',
  templateUrl: './technology-dialog.component.html',
  styleUrls: ['./technology-dialog.component.scss'],
})
export class TechnologyDialogComponent implements OnInit {
  myForm: UntypedFormGroup = this.fb.group({
    technologyId: '',
    name: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
    typeId: [
      '',
      [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
    ],
    identifiers: this.fb.array(
      [this.fb.control('', Validators.required)],
      [this.minLength(1)]
    ),
  });
  types: TechType[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { technology?: Technology },
    public dialogRef: MatDialogRef<TechnologyDialogComponent>,
    public fb: UntypedFormBuilder,
    private techTypesService: TechTypesService
  ) {
    if (data.technology) {
      this.setFormValue(data.technology);
    }
  }

  ngOnInit(): void {
    this.techTypesService
      .getTechTypes({})
      .subscribe(({ data }) => (this.types = data));
  }

  get identifiers() {
    return this.myForm.get('identifiers') as UntypedFormArray;
  }

  setFormValue(technology: Technology) {
    this.myForm.patchValue({
      technologyId: technology.technologyId,
      name: technology.name,
      typeId: technology.type.techTypeId,
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
      if (!(control instanceof UntypedFormArray)) return;
      return control.length < min ? { minLength: true } : null;
    };
  }
}
