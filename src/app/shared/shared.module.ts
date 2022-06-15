import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

@NgModule({
  declarations: [SidebarComponent, TopNavComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
  ],

  exports: [SidebarComponent, TopNavComponent, HeaderComponent],
})
export class SharedModule {}
