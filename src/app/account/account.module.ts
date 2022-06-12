import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './dashboard/components/card/card.component';
import { ProfileCardComponent } from './professional-profiles/components/profile-card/profile-card.component';
import { EditAccountComponent } from './overview/pages/edit-account/edit-account.component';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { GenerateComponent } from './professional-profiles/pages/generate/generate.component';
import { ProfilesComponent } from './professional-profiles/pages/profiles/profiles.component';
import { PpgRoutingModule } from './account-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material/material.module';
import { TechChipsComponent } from './professional-profiles/components/tech-chip-list/tech-chips.component';
import { PieChartComponent } from './dashboard/components/charts/pie-chart/pie-chart.component';
import { AccountComponent } from './account.component';

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
