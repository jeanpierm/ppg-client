import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { ReportsService } from '../../../core/services/reports.service';
import { TechnologyDialogComponent } from '../../components/technology-dialog/technology-dialog.component';
import { Technology } from '../../interfaces/technology.interface';
import { TechnologiesService } from '../../services/technologies.service';
@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
})
export class TechnologiesComponent implements OnInit, AfterViewInit {
  static readonly PATH = 'technologies';

  readonly defaultPageSize = 10;
  readonly exportColumns = ['TIPO', 'NOMBRE', 'IDENTIFICADORES'];
  readonly displayedColumns = ['Tipo', 'Nombre', 'Identificadores', 'Acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private readonly technologiesService: TechnologiesService,
    private readonly alertService: AlertService,
    private readonly reportsService: ReportsService
  ) {}

  get loading(): boolean {
    return this.technologiesService.fetchLoading;
  }

  get technologies(): Array<Technology> {
    return this.technologiesService.technologies;
  }

  get resultsLength(): number {
    return this.technologiesService.resultsLength;
  }

  ngOnInit(): void {
    this.technologiesService.loadTechnologies({
      size: this.defaultPageSize,
      page: 1,
    });
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.loadTechnologiesPage();
        this.paginator.firstPage();
      });

    this.paginator.page.subscribe(() => this.loadTechnologiesPage());
  }

  loadTechnologiesPage() {
    this.technologiesService.loadTechnologies({
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1, // add +1 because paginator is zero-based, and the API isn't
      search: this.input.nativeElement.value,
    });
  }

  delete(technologyId: string) {
    this.alertService
      .warning('¿Está seguro de eliminar esta tecnología?')
      .then((result) => {
        if (result.isConfirmed) {
          this.technologiesService.deleteTechnology(technologyId).subscribe({
            next: (_) => {
              this.alertService.success({
                title: 'Tecnología eliminada exitosamente',
              });
              this.loadTechnologiesPage();
            },
            error: () => this.alertService.error(),
          });
        }
      });
  }

  openDialog(technology?: Technology): void {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
      data: { technology },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const technology = result;
        const action = technology?.technologyId
          ? this.technologiesService.updateTechnology(
              technology.technologyId,
              technology
            )
          : this.technologiesService.createTechnology(technology);
        action.subscribe({
          next: () => {
            this.loadTechnologiesPage();
            this.alertService.success({
              title: '¡Tecnología guardada exitosamente!',
            });
          },
          error: () => {
            this.alertService.error();
          },
        });
      }
    });
  }

  exportXlsx() {
    const data = this.technologies.map((technology) => ({
      TIPO: technology.type.label,
      NOMBRE: technology.name,
      IDENTIFICADORES: technology.identifiers.join(', '),
    }));
    const filename = `technologies_report_${new Date().getTime()}`;
    this.reportsService.exportXlsx(data, filename);
  }

  exportPdf() {
    const head = [this.exportColumns];
    const body = this.technologies.map(({ type, name, identifiers }) => [
      type.label,
      name,
      identifiers.join(', '),
    ]);
    const filename = `technologies_report_${new Date().getTime()}`;
    this.reportsService.exportPdf(head, body, filename);
  }
}
