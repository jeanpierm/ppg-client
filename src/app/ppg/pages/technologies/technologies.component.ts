import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Technology } from '../../models/technologies/technology';
import { TypesList } from '../../models/technologies/types-list';
import { TechnologiesService } from '../../services/technologies.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
})
export class TechnologiesComponent implements OnInit {
  static readonly PATH = 'technologies';
  types = TypesList;
  public myForm: FormGroup;
  public displayedColumns: string[] = [
    'Tipo',
    'Nombre',
    'Identificadores',
    'options',
  ];

  constructor(
    private readonly TechnologiesService: TechnologiesService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) {
    this.myForm = new FormGroup({});
  }

  public get loading(): boolean {
    return this.TechnologiesService.fetchLoading;
  }

  public get technologies(): Array<Technology> {
    return this.TechnologiesService.technologies;
  }

  ngOnInit(): void {
    this.TechnologiesService.loadProfessionalProfiles();
  }

  onForm() {
    this.myForm = this.fb.group({
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
  }

  search() {
    console.log('Cargando tecnologias...');
    this.TechnologiesService.loadProfessionalProfiles();
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.onForm();
    const dialogRef = this.dialog.open(templateRef);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get identifiers() {
    return this.myForm.get('identifiers') as FormArray;
  }

  addIdentifier() {
    if (this.identifiers.length > 2) {
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

  save() {
    const technology: Technology = this.myForm.value;
    console.log(technology);
  }
}
