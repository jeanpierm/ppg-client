import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/dashboard/card/card.component';
import { PieChartComponent } from './components/dashboard/charts/pie-chart/pie-chart.component';
import { ProfileCardComponent } from './components/profiles/profile-card/profile-card.component';
import { TechChipsComponent } from './components/profiles/tech-chip-list/tech-chips.component';
import { AccountComponent } from './pages/account/account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GenerateComponent } from './pages/generate/generate.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { PpgRoutingModule } from './ppg-routing.module';
import { PpgComponent } from './ppg.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsersComponent } from './pages/users/users.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { MaterialModule } from '../core/material/material.module';

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
    HttpClientModule,
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
