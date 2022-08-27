import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeactivoPage } from './viajeactivo.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeactivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeactivoPageRoutingModule {}
