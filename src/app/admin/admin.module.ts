import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';
import { MaterialModule } from '../material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { AdminNavListComponent } from './components/admin-nav-list/admin-nav-list.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    TechnologiesComponent,
    UserDialogComponent,
    AdminNavListComponent,
    AdminHeaderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
