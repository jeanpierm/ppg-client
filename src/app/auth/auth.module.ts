import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthModule {}
