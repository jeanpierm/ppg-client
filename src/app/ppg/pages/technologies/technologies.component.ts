import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { SweetAlert } from '../../config/sweetAlert';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
})
export class TechnologiesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  static readonly PATH = 'technologies';
  types = TypesList;
  public myForm: FormGroup;
  private matDialogRef: any;
  update = false;
  public alert: SweetAlert;
  sizePerPage = 10;
  public displayedColumns: string[] = [
    'Tipo',
    'Nombre',
    'Identificadores',
    'options',
  ];

  constructor(
    private readonly technologiesService: TechnologiesService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.myForm = new FormGroup({});
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.technologiesService.loadTechnology(this.sizePerPage);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadTechnologyPage();
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.loadTechnologyPage())).subscribe();
  }

  loadTechnologyPage() {
    this.technologiesService.loadTechnology(
      this.sizePerPage,
      this.paginator.pageIndex,
      this.input.nativeElement.value
    );
  }

  public get loading(): boolean {
    return this.technologiesService.fetchLoading;
  }

  public get technologies(): Array<Technology> {
    return this.technologiesService.technologies;
  }

  public get resultsLength(): number {
    return this.technologiesService.resultsLength;
  }

  onForm() {
    this.myForm = this.fb.group({
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
  }

  setForm(technology: Technology) {
    this.onForm();
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

  save(templateRef: TemplateRef<any>) {
    this.update = false;
    this.onForm();
    this.matDialogRef = this.dialog.open(templateRef);

    this.matDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const technology: Technology = result;
        this.technologiesService.saveTechnology(technology).subscribe({
          next: (_) => {
            this.technologiesService.loadTechnology(
              this.sizePerPage,
              this.paginator.pageIndex
            );
            this.alert.successAlert('Se ha guardado correctamente!');
          },
          error: (err) => {
            this.alert.successAlert('Error:' + err);
          },
        });
      }
    });
  }

  get identifiers() {
    return this.myForm.get('identifiers') as FormArray;
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

  onNoClick(): void {
    this.matDialogRef.close();
  }

  delete(technologyId: string) {
    this.alert
      .dialogAlert('Esta seguro de eliminar esta tecnología?')
      .then((result) => {
        if (result.isConfirmed) {
          this.technologiesService.deleteTechnology(technologyId).subscribe({
            next: (_) =>
              this.technologiesService.loadTechnology(this.sizePerPage),
            error: (err) => this.alert.errorAlert(err),
          });
        }
      });
  }

  edit(tecnology: Technology, templateRef: TemplateRef<any>) {
    this.update = true;
    this.setForm(tecnology);
    this.matDialogRef = this.dialog.open(templateRef);

    this.matDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const technology: Technology = result;
        this.technologiesService.updateTechnology(technology).subscribe({
          next: (_) =>
            this.technologiesService.loadTechnology(
              this.sizePerPage,
              this.paginator.pageIndex
            ),
          error: (err) => this.alert.errorAlert(err),
        });
      }
    });
  }
}
