import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DiscoverComponent } from './pages/discover/discover.component';
import { DiscoverFormComponent } from './components/discover-form/discover-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { TechChipsComponent } from './components/tech-chip-list/tech-chips.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobCardComponent } from './components/job-offer-card/job-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { SkelentonLoaderComponent } from './components/skelenton-loader/skelenton-loader.component';

@NgModule({
  declarations: [
    ProfileListComponent,
    ProfileComponent,
    DiscoverComponent,
    DiscoverFormComponent,
    ProfileCardComponent,
    TechChipsComponent,
    JobCardComponent,
    DashboardComponent,
    PieChartComponent,
    CoursesDialogComponent,
    CourseCardComponent,
    SkelentonLoaderComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    NgChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilesModule {}
