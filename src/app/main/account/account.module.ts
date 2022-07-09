import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { PpgRoutingModule } from './account-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../material/material.module';
import { AccountComponent } from './account.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HeaderComponent } from './components/account-header/account-header.component';
import { AccountNavListComponent } from './components/account-nav-list/account-nav-list.component';
import { PhotoComponent } from './components/photo/photo.component';
import { EditDownloadComponent } from './pages/edit-download/edit-download.component';

@NgModule({
  declarations: [
    EditAccountComponent,
    AccountComponent,
    OverviewComponent,
    ChangePasswordComponent,
    HeaderComponent,
    AccountNavListComponent,
    PhotoComponent,
    EditDownloadComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LayoutModule,
    FlexLayoutModule,
    SharedModule,
    PpgRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class AccountModule {}
