import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';

import { InicioSesionPage } from './inicio-sesion.page';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionPageRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {}
