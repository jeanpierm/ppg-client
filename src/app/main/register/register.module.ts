import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
  ],
})
export class RegisterModule {}
