import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TechType } from '../../../../admin/interfaces/tech-type.interface';
import { Technology } from '../../../../admin/interfaces/technology.interface';
import { removeDuplicateObjects } from '../../../../core/utils/object.util';
import { TechChipItem } from '../../interfaces/tech-chip-item.interface';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-tech-chips',
  templateUrl: './tech-chips.component.html',
  styleUrls: ['./tech-chips.component.scss'],
})
export class TechChipsComponent implements OnInit {
  @Input() technologies!: Technology[];

  techChipItems: TechChipItem[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTechChipItems();
  }

  loadTechChipItems() {
    const rawTechTypes = this.technologies.map((technology) => technology.type);
    const techTypes = removeDuplicateObjects(rawTechTypes) as TechType[];
    techTypes.forEach((type) => {
      const technologyNames = this.getTechnologyNamesByType(
        this.technologies,
        type.name
      );
      if (technologyNames.length) {
        this.techChipItems.push({ label: type.label, technologyNames });
      }
    });
  }

  openDialog(technology: string) {
    this.dialog.open(CoursesDialogComponent, {
      data: { coursename: technology },
      disableClose: true,
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
