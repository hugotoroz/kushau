import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeactivoCondPageRoutingModule } from './viajeactivo-cond-routing.module';

import { ViajeactivoCondPage } from './viajeactivo-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeactivoCondPageRoutingModule
  ],
  declarations: [ViajeactivoCondPage]
})
export class ViajeactivoCondPageModule {}
