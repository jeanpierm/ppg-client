import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpgRoutingModule } from './ppg-routing.module';
import { PpgComponent } from './ppg.component';

@NgModule({
  declarations: [PpgComponent],
  imports: [CommonModule, PpgRoutingModule],
})
export class PpgModule {}
