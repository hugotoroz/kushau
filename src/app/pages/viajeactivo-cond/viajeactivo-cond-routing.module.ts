import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeactivoCondPage } from './viajeactivo-cond.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeactivoCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeactivoCondPageRoutingModule {}
