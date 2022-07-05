import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
  ],

  exports: [HeaderComponent],
})
export class SharedModule {}
