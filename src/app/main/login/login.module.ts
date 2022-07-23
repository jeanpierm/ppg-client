import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
  ],
})
export class LoginModule {}
