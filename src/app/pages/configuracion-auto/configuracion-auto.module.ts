import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionAutoPageRoutingModule } from './configuracion-auto-routing.module';

import { ConfiguracionAutoPage } from './configuracion-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionAutoPageRoutingModule
  ],
  declarations: [ConfiguracionAutoPage]
})
export class ConfiguracionAutoPageModule {}
