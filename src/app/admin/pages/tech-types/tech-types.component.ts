import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { TechTypeDialogComponent } from '../../components/tech-type-dialog/tech-type-dialog.component';
import { TechType } from '../../interfaces/tech-type.interface';
import { TechTypesService } from '../../services/tech-types.service';

@Component({
  selector: 'app-tech-types',
  templateUrl: './tech-types.component.html',
  styleUrls: ['./tech-types.component.scss'],
})
export class TechTypesComponent implements OnInit, AfterViewInit {
  static readonly PATH = 'tech-types';
  readonly defaultPageSize = 10;
  displayedColumns: string[] = ['Label', 'Nombre', 'Acciones'];
  status = 'A';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private readonly techTypesService: TechTypesService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private readonly alertService: AlertService
  ) {}

  get techTypes(): Array<TechType> {
    return this.techTypesService.techTypes;
  }

  get resultsLength(): number {
    return this.techTypesService.resultsLength;
  }

  get loading(): boolean {
    return this.techTypesService.fetchLoading;
  }

  ngOnInit(): void {
    this.techTypesService.loadTechTypes({
      size: this.defaultPageSize,
      page: 1,
      status: this.status,
    });
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.loadTechTypePages();
        this.paginator.firstPage();
      });

    this.paginator.page.subscribe(() => this.loadTechTypePages());
  }

  loadTechTypePages() {
    console.log(this.status);
    this.techTypesService.loadTechTypes({
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1,
      search: this.input.nativeElement.value,
      status: this.status,
    });
  }

  openDialog(type?: TechType) {
    const matDialog = this.dialog.open(TechTypeDialogComponent, {
      data: { type },
    });

    matDialog.afterClosed().subscribe((result) => {
      if (result) {
        const type: TechType = result;
        const action = type.techTypeId
          ? this.techTypesService.updateTechType(type.techTypeId, type)
          : this.techTypesService.saveTechType(type);
        action.subscribe({
          next: (res) => {
            this.loadTechTypePages();
            this.alertService.success(
              'Tipo de tecnología guardado exitosamente!'
            );
          },
          error: (err) => this.alertService.error(err),
        });
      }
    });
  }

  delete(type: TechType) {
    console.log(type);
    this.alertService
      .warning(
        'Esta seguro de eliminar este tipo de tecnología?',
        'Todas las tecnologías de este tipo se eliminarán'
      )
      .then((resp) => {
        if (resp.isConfirmed) {
          this.techTypesService.deleteTechType(type.techTypeId).subscribe({
            next: (res) => {
              this.loadTechTypePages();
              this.alertService.success(
                'Tipo de tecnología eliminado exitosamente!'
              );
            },
            error: (err) => this.alertService.error(err),
          });
        }
      });
  }
}
