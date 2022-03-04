import { Component, OnInit } from '@angular/core';
import { ProfessionalProfile } from 'src/app/models/professional-profile';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  public fecha_inicio: any;
  public fecha_fin: any;
  columns: string[] = ['No.', 'JobTitle', 'Location', 'Ingles'];

  public professionalProfiles: Array<ProfessionalProfile>;

  constructor() {
    this.fecha_fin = {};
    this.fecha_inicio = {};
    this.professionalProfiles = [];
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.professionalProfiles,
      event.previousIndex,
      event.currentIndex
    );
  }
}
