import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpgComponent } from './ppg.component';

const routes: Routes = [
  {
    path: '',
    component: PpgComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpgRoutingModule {}
