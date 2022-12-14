import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeactivoPageRoutingModule } from './viajeactivo-routing.module';

import { ViajeactivoPage } from './viajeactivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeactivoPageRoutingModule
  ],
  declarations: [ViajeactivoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViajeactivoPageModule {}
