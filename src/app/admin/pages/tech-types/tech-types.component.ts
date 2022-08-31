import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { EntityStatus } from '../../../core/enums/entity-status.enum';
import { HelperService } from '../../../core/services/helper.service';
import { ReportsService } from '../../../core/services/reports.service';
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
  readonly exportColumns = ['LABEL', 'NOMBRE', 'ESTADO'];
  readonly displayedColumns = ['Label', 'Nombre', 'Estado', 'Acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;
  statusInputValue = EntityStatus.Active;
  statusOptions = [
    { label: 'Activos', value: EntityStatus.Active },
    { label: 'Eliminados', value: EntityStatus.Inactive },
    { label: 'Todos', value: '' },
  ];

  constructor(
    public dialog: MatDialog,
    public readonly helper: HelperService,
    private readonly techTypesService: TechTypesService,
    private readonly alertService: AlertService,
    private readonly reportsService: ReportsService
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
      status: this.statusInputValue,
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
    this.techTypesService.loadTechTypes({
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1,
      search: this.input.nativeElement.value,
      status: this.statusInputValue,
    });
  }

  openDialog(type?: TechType) {
    const matDialog = this.dialog.open(TechTypeDialogComponent, {
      data: { type },
      panelClass: 'dialog-responsive',
    });

    matDialog.afterClosed().subscribe((result) => {
      if (result) {
        const resultType: TechType = result;
        const wasEdit = !!type;
        const action = wasEdit
          ? this.techTypesService.updateTechType(type.techTypeId, resultType)
          : this.techTypesService.saveTechType(resultType);
        action.subscribe({
          next: () => {
            this.loadTechTypePages();
            this.alertService.success({
              title: 'Tipo de tecnología guardado exitosamente',
            });
          },
          error: () => this.alertService.error(),
        });
      }
    });
  }

  delete(type: TechType) {
    this.alertService
      .warning(
        '¿Está seguro de eliminar este tipo de tecnología?',
        'Todas las tecnologías de este tipo se eliminarán'
      )
      .then((resp) => {
        if (resp.isConfirmed) {
          this.techTypesService.deleteTechType(type.techTypeId).subscribe({
            next: () => {
              this.loadTechTypePages();
              this.alertService.success({
                title: 'Tipo de tecnología eliminado exitosamente',
              });
            },
            error: () => this.alertService.error(),
          });
        }
      });
  }

  activate(id: string) {
    this.alertService
      .warning('¿Está seguro de restaurar este tipo de tecnología?')
      .then((res) => {
        if (res.isDenied || res.isDismissed) return;
        this.techTypesService
          .updateTechType(id, {
            status: EntityStatus.Active,
          })
          .subscribe({
            next: () => {
              this.loadTechTypePages();
              this.alertService.success({
                title: 'Tipo de tecnología restaurado exitosamente',
              });
            },
            error: () => this.alertService.error(),
          });
      });
  }

  exportXlsx() {
    const data = this.techTypes.map(({ label, name, status }) => ({
      LABEL: label,
      NOMBRE: name,
      ESTADO: this.helper.statusResolver(status),
    }));
    this.reportsService.exportXlsx(data, 'technology_type');
  }

  exportPdf() {
    const head = [this.exportColumns];
    const body = this.techTypes.map(({ label, name, status }) => [
      label,
      name,
      this.helper.statusResolver(status),
    ]);
    this.reportsService.exportPdf({ head, body, type: 'technology_type' });
  }
}
