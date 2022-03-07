import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProfessionalProfilesService } from 'src/app/ppg/services/professional-profiles.service';
import { ProfessionalProfile } from '../../models/profiles/professional-profile';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
})
export class ProfilesComponent implements OnInit {
  @ViewChild('htmlProfiles') htmlProfiles!: ElementRef;
  static readonly PATH = 'perfiles';

  public initDate: Date = this.todayMinus30Days;
  public endDate: Date = this.today;
  public jobTitle: string = '';
  public location: string = '';
  public columns: string[] = ['No.', 'JobTitle', 'Location', 'Ingles'];

  get todayMinus30Days(): Date {
    return new Date(this.today.setDate(this.today.getDate() - 30));
  }

  get today(): Date {
    return new Date();
  }

  get professionalProfiles(): ProfessionalProfile[] {
    return this.ppService.professionalProfiles;
  }

  get loading(): boolean {
    return this.ppService.fetchLoading;
  }

  constructor(private readonly ppService: ProfessionalProfilesService) {}

  ngOnInit(): void {
    this.ppService.loadProfessionalProfiles();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.professionalProfiles,
      event.previousIndex,
      event.currentIndex
    );
  }

  get() {
    console.log('Cargando perfiles...');
    this.ppService.loadProfessionalProfiles(
      this.initDate,
      this.endDate,
      this.jobTitle,
      this.location
    );
  }

  downloadReport() {
    const element = document.getElementById('htmlProfiles');
    if (!element) return;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 2,
    };
    html2canvas(element, options).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
      doc.save(`${new Date().toISOString()}_ppg_report.pdf`);
    });
  }
}
