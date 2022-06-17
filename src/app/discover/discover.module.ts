import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DiscoverFormComponent } from './components/discover-form/discover-form.component';

@NgModule({
  declarations: [DiscoverComponent, DiscoverFormComponent],
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
  ],
})
export class DiscoverModule {}
