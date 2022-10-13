import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainconductorPageRoutingModule } from './mainconductor-routing.module';

import { MainconductorPage } from './mainconductor.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainconductorPageRoutingModule
  ],
  providers: [
    Geolocation
  ],
  declarations: [MainconductorPage]
})
export class MainconductorPageModule {}
