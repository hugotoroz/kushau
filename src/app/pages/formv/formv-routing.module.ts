import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormvPage } from './formv.page';

const routes: Routes = [
  {
    path: '',
    component: FormvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormvPageRoutingModule {}
