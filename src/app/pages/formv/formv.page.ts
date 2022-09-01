import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-formv',
  templateUrl: './formv.page.html',
  styleUrls: ['./formv.page.scss'],
})
export class FormvPage implements OnInit {
  direccion: string="";
  fila: string="";
  precio: number=NaN;
  descrip: string="";
  // variable
  estado: string="Mostrar Filas";
  private Desplegarimagen: boolean = false;

  constructor(public toastController: ToastController,public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }
  // function
  desplegarImgen() {
    this.Desplegarimagen = !this.Desplegarimagen;
    this.estado= "Mostrar Filas";
    
    if (this.Desplegarimagen) {
      this.estado="Ocultar Filas";
    }
  }
  validar(){
    if(this.direccion == "" || this.fila == "" || this.precio == NaN || this.descrip == ""){
      this.Vacio();
    }
    else if(this.precio < 1000){
      this.Precio();
    }
    else{
      this.Viaje();
      this.router.navigate(['/viajeactivo-cond'])
    }
  }

  async Vacio() {
    const toast = await this.toastController.create({
      message: 'Debe completar todos los campos.',
      duration: 4000
    });
    toast.present();
  }
  async Precio() {
    const toast = await this.toastController.create({
      message: 'El precio debe ser mayor a $1000 pesos.',
      duration: 4000
    });
    toast.present();
  }
  async Viaje() {
    const toast = await this.toastController.create({
      message: 'Viaje iniciado con éxito.',
      duration: 4000
    });
    toast.present();
  }
}
