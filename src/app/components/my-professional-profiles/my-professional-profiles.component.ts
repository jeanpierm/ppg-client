import { Component, OnInit } from '@angular/core';
import { ProfessionalProfile } from 'src/app/models/professional-profile';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProfessionalProfilesService } from 'src/app/services/professional-profiles.service';

@Component({
  selector: 'app-my-professional-profiles',
  templateUrl: './my-professional-profiles.component.html',
  styleUrls: ['./my-professional-profiles.component.css'],
})
export class MyProfessionalProfilesComponent implements OnInit {
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
}
