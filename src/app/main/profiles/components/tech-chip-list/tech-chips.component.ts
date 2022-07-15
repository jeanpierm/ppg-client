import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-tech-chips',
  templateUrl: './tech-chips.component.html',
  styleUrls: ['./tech-chips.component.scss'],
})
export class TechChipsComponent {
  @Input() technologies!: string[];
  @Input() label!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(technology: string) {
    const dialogRef = this.dialog.open(CoursesDialogComponent, {
      data: { coursename: technology },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
