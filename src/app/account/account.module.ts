import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GenerateComponent } from './pages/generate/generate.component';
import { PpgRoutingModule } from './account-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material/material.module';
import { TechChipsComponent } from './components/tech-chip-list/tech-chips.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AccountComponent } from './account.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';

@NgModule({
  declarations: [
    EditAccountComponent,
    AccountComponent,
    DashboardComponent,
    GenerateComponent,
    ProfilesComponent,
    ProfileCardComponent,
    TechChipsComponent,
    CardComponent,
    PieChartComponent,
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
export class AccountModule {}
