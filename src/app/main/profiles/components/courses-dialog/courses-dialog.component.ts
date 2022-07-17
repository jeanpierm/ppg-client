import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseInterface } from 'src/app/admin/interfaces/course.interface';
import { TechnologiesService } from 'src/app/admin/services/technologies.service';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent implements OnInit {
  loading: boolean = true;
  public courses: CourseInterface[] = [];
  constructor(
    public dialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { coursename: string },
    private readonly technologiesService: TechnologiesService
  ) {}

  ngOnInit(): void {
    this.loadCourses(this.data.coursename);
  }

  loadCourses(coursename: string) {
    this.technologiesService.getCourses(coursename).subscribe({
      next: (res) => {
        this.courses = res.data;
        this.loading = false;
      },
      error: () => {
        this.courses = [];
        this.loading = false;
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
