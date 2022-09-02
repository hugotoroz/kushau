import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionConductorPage } from './configuracion-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionConductorPageRoutingModule {}
