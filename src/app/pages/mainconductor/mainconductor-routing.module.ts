import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainconductorPage } from './mainconductor.page';

const routes: Routes = [
  {
    path: '',
    component: MainconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainconductorPageRoutingModule {}
