import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainconductorPageRoutingModule } from './mainconductor-routing.module';

import { MainconductorPage } from './mainconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainconductorPageRoutingModule
  ],
  declarations: [MainconductorPage]
})
export class MainconductorPageModule {}
