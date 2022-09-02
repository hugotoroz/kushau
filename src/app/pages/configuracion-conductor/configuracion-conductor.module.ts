import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionConductorPageRoutingModule } from './configuracion-conductor-routing.module';

import { ConfiguracionConductorPage } from './configuracion-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionConductorPageRoutingModule
  ],
  declarations: [ConfiguracionConductorPage]
})
export class ConfiguracionConductorPageModule {}
