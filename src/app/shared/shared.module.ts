import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LogoComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
  ],

  exports: [HeaderComponent, FooterComponent, LogoComponent],
})
export class SharedModule {}
