import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { ViajeactivoCondPageRoutingModule } from './viajeactivo-cond-routing.module';

import { ViajeactivoCondPage } from './viajeactivo-cond.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeactivoCondPageRoutingModule
  ],
  declarations: [ViajeactivoCondPage]
})
export class ViajeactivoCondPageModule {}
