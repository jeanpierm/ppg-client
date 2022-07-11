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
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  private matDialogRef: any;
  displayedColumns: string[] = [
    'Tipo',
    'Nombre',
    'Identificadores',
    'Acciones',
  ];

  constructor(
    private readonly technologiesService: TechnologiesService,
    public dialog: MatDialog,

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
  }

  ngAfterViewInit() {
    this.technologiesService.loadTechnologies({
      size: this.paginator.pageSize,
    });

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.loadTechnologyPage();
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.loadTechnologyPage())).subscribe();
  }

  loadTechnologyPage() {
    this.technologiesService.loadTechnologies({
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      search: this.input.nativeElement.value,
    });
  }

  delete(technologyId: string) {
    this.alertService
      .warning('Esta seguro de eliminar esta tecnología?')
      .then((result) => {
        if (result.isConfirmed) {
          this.technologiesService.deleteTechnology(technologyId).subscribe({
            next: (_) => {
              this.alertService.success('Tecnología eliminada exitosamente');
              this.loadTechnologyPage();
            },
            error: () => this.alertService.error(),
          });
        }
      });
  }

  openDialog(technology?: Technology): void {
    this.matDialogRef = this.dialog.open(TechnologyDialogComponent, {
      data: { technology },
    });

    this.matDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const technology: Technology = result;
        const action = technology?.technologyId
          ? this.technologiesService.updateTechnology(technology)
          : this.technologiesService.saveTechnology(technology);
        action.subscribe({
          next: (_) => {
            this.loadTechnologyPage();
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
