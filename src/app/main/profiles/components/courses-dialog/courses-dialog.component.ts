import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseInterface } from 'src/app/admin/interfaces/course.interface';
import { TechnologiesService } from 'src/app/admin/services/technologies.service';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent implements OnInit {
  public coursesData: CourseInterface[] = [
    {
      link: 'https://es.coursera.org/learn/aprendiendo-programar-python',
      imagen:
        'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7c/a97a6e3fc74812a808cd95da906b19/Introduccion-a-la-programacion-en-Python-I-Aprendiendo-a-programar-con-Python.jpg?auto=format%2Ccompress&dpr=1&w=330&h=330&q=25&fit=fill',
      title:
        'Introducción a la programación en Python I: Aprendiendo a programar con Python',
      description:
        'HABILIDADES QUE OBTENDRÁS\nComputer Programming\nPython Programming\nList & Label\nProgramming Language',
    },
    {
      link: 'https://es.coursera.org/specializations/programming-python-java',
      imagen:
        'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/87/4baf437c6840719574408b962297cf/Specialization-python-java_1200x1200.jpg?auto=format%2Ccompress&dpr=2&blur=200&px=8&w=330&h=330',
      title: 'Introduction to Programming with Python and Java',
      description:
        'HABILIDADES QUE OBTENDRÁS\nProgramming Principles\nPython Programming\nJava Programming\nData Structure\nComputer Programming\nPython Tools\nPython Syntax And Semantics\nData Science\nPython Libraries\nData Analysis\nData Visualization (DataViz)\nJava Tools\nMOSTRAR TODO SKILLS\nMostrar todo',
    },
    {
      link: 'https://es.coursera.org/learn/python-basics',
      imagen:
        'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/77/17ca30e9cf11e8931fddf70eb768e1/pythonfluency_1x1_course_1.png?auto=format%2Ccompress&dpr=2&blur=200&px=8&w=330&h=330',
      title: 'Python Basics',
    },
  ];
  loading: boolean = true;
  public courses: CourseInterface[] = [];
  constructor(
    public dialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { coursename: string },
    private readonly technologiesService: TechnologiesService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    /* this.loadCourses(this.data.coursename); */
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
