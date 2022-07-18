import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TechnologiesService } from '../../services/technologies.service';

import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Technology } from '../../interfaces/technology.interface';
import { AlertService } from '../../../core/services/alert.service';
import { TechnologyDialogComponent } from '../../components/technology-dialog/technology-dialog.component';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
})
export class TechnologiesComponent implements OnInit, AfterViewInit {
  static readonly PATH = 'technologies';
  readonly defaultPageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  displayedColumns: string[] = [
    'Tipo',
    'Nombre',
    'Identificadores',
    'Acciones',
  ];

  constructor(
    public dialog: MatDialog,
    private readonly technologiesService: TechnologiesService,
    private spinner: NgxSpinnerService,
    private readonly alertService: AlertService
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
    this.spinner.show();
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
              this.alertService.success('Tecnología eliminada exitosamente');
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
            this.alertService.success('¡Tecnología guardada exitosamente!');
          },
          error: () => {
            this.alertService.error();
          },
        });
      }
    });
  }
}
