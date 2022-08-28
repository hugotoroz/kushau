import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormvPageRoutingModule } from './formv-routing.module';

import { FormvPage } from './formv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormvPageRoutingModule
  ],
  declarations: [FormvPage]
})
export class FormvPageModule {}
