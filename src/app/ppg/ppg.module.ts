import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/dashboard/card/card.component';
import { FrameworksComponent } from './components/dashboard/charts/frameworks/frameworks.component';
import { LenguagesComponent } from './components/dashboard/charts/lenguages/lenguages.component';
import { ProfileCardComponent } from './components/profiles/profile-card/profile-card.component';
import { TechChipsComponent } from './components/profiles/tech-chip-list/tech-chips.component';
import { AccountComponent } from './pages/account/account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GenerateComponent } from './pages/generate/generate.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { PpgRoutingModule } from './ppg-routing.module';
import { PpgComponent } from './ppg.component';
import { DatabasesComponent } from './components/dashboard/charts/databases/databases.component';
import { ToolsComponent } from './components/dashboard/charts/tools/tools.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    FrameworksComponent,
    LenguagesComponent,
    DatabasesComponent,
    ToolsComponent,
    TechnologiesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    FlexLayoutModule,
    SharedModule,
    PpgRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PpgModule {}
