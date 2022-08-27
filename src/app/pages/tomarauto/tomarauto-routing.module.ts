import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarautoPage } from './tomarauto.page';

const routes: Routes = [
  {
    path: '',
    component: TomarautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarautoPageRoutingModule {}
