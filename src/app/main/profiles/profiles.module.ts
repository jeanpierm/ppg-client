import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [ProfileListComponent, ProfileComponent],
  imports: [CommonModule, ProfilesRoutingModule, SharedModule, MaterialModule],
})
export class ProfilesModule {}
