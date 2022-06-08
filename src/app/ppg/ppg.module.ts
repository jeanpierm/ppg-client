import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './dashboard/components/card/card.component';
import { ProfileCardComponent } from './professional-profiles/components/profile-card/profile-card.component';
import { AccountComponent } from './account/pages/account/account.component';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { GenerateComponent } from './professional-profiles/pages/generate/generate.component';
import { ProfilesComponent } from './professional-profiles/pages/profiles/profiles.component';
import { PpgRoutingModule } from './ppg-routing.module';
import { PpgComponent } from './ppg.component';
import { TechnologiesComponent } from './technologies/pages/technologies/technologies.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material/material.module';
import { UserDialogComponent } from './users/components/user-dialog/user-dialog.component';
import { UsersComponent } from './users/pages/users/users.component';
import { TechChipsComponent } from './professional-profiles/components/tech-chip-list/tech-chips.component';
import { PieChartComponent } from './dashboard/components/charts/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    PpgComponent,
    AccountComponent,
    DashboardComponent,
    GenerateComponent,
    ProfilesComponent,
    ProfileCardComponent,
    TechChipsComponent,
    CardComponent,
    PieChartComponent,
    TechnologiesComponent,
    UsersComponent,
    UserDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LayoutModule,
    FlexLayoutModule,
    SharedModule,
    PpgRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PpgModule {}
