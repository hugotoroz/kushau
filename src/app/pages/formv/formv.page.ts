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
  fila: number=NaN;
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
    if(this.direccion == "" || this.fila == NaN || this.precio == NaN || this.descrip == ""){
      this.presentToast("Debe completar todos los campos.");
    }
    else if (this.fila < 1 || this.fila >8){
      this.presentToast("La fila debe ser un número entre 1 y 8.");

    }
    else if(this.precio < 1000){
      this.presentToast("El precio debe ser mayor a $1000 pesos.");
    }
    else{
      this.presentToast("Viaje iniciado con éxito.");
      this.router.navigate(['/viajeactivo-cond'])
    }
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 4000
    });
    toast.present();
  }
  
}
