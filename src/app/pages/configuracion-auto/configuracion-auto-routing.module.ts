import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionAutoPage } from './configuracion-auto.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionAutoPageRoutingModule {}
