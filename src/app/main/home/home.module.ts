import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpgRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PpgRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
  ],
})
export class HomeModule {}
