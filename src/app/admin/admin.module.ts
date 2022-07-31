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
import { TechnologyDialogComponent } from './components/technology-dialog/technology-dialog.component';
import { TechTypesComponent } from './pages/tech-types/tech-types.component';
import { TechTypeDialogComponent } from './components/tech-type-dialog/tech-type-dialog.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    TechnologiesComponent,
    UserDialogComponent,
    AdminNavListComponent,
    AdminHeaderComponent,
    TechnologyDialogComponent,
    TechTypesComponent,
    TechTypeDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
