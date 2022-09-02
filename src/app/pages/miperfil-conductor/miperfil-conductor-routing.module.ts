import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiperfilConductorPage } from './miperfil-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: MiperfilConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiperfilConductorPageRoutingModule {}
