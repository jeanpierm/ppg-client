import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Technology } from '../../../../admin/interfaces/technology.interface';
import { TechTypesService } from '../../../../admin/services/tech-types.service';
import { TechChipItem } from '../../interfaces/tech-chip-item.interface';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-tech-chips',
  templateUrl: './tech-chips.component.html',
  styleUrls: ['./tech-chips.component.scss'],
})
export class TechChipsComponent {
  @Input() technologies!: Technology[];

  techChipItems: TechChipItem[] = [];

  constructor(
    public dialog: MatDialog,
    private techTypesService: TechTypesService
  ) {
    this.loadTechChipItems();
  }

  loadTechChipItems() {
    this.techTypesService.getTechTypes({}).subscribe(({ data: types }) => {
      types.forEach((type) => {
        const technologyNames = this.getTechnologyNamesByType(
          this.technologies,
          type.name
        );
        if (technologyNames.length) {
          this.techChipItems.push({ label: type.label, technologyNames });
        }
      });
    });
  }

  openDialog(technology: string) {
    const dialogRef = this.dialog.open(CoursesDialogComponent, {
      data: { coursename: technology },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  private getTechnologyNamesByType(
    technologies: Technology[],
    typeName: string
  ) {
    return technologies
      .filter(({ type }) => type.name === typeName)
      .map(({ name }) => name);
  }
}
