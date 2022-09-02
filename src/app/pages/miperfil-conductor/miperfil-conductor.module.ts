import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiperfilConductorPageRoutingModule } from './miperfil-conductor-routing.module';

import { MiperfilConductorPage } from './miperfil-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiperfilConductorPageRoutingModule
  ],
  declarations: [MiperfilConductorPage]
})
export class MiperfilConductorPageModule {}
