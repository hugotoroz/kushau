import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarautoPageRoutingModule } from './tomarauto-routing.module';

import { TomarautoPage } from './tomarauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarautoPageRoutingModule
  ],
  declarations: [TomarautoPage]
})
export class TomarautoPageModule {}
