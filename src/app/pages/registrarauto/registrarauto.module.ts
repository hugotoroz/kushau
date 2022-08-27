import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarautoPageRoutingModule } from './registrarauto-routing.module';

import { RegistrarautoPage } from './registrarauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarautoPageRoutingModule
  ],
  declarations: [RegistrarautoPage]
})
export class RegistrarautoPageModule {}
