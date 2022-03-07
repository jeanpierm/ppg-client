import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SidebarComponent, TopNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    LayoutModule,
    FlexLayoutModule,
  ],

  exports: [SidebarComponent, TopNavComponent],
})
export class SharedModule {}
