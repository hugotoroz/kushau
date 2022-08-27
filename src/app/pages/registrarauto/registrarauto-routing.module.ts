import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarautoPage } from './registrarauto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarautoPageRoutingModule {}
