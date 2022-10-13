import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})

export class ConductorPage implements OnInit {
  nombre: string = "";
  apellido: string = "";
  clave: string = "";
  clave1: string = "";
  correo: string = "";
  direccion: string = "";
  rut: string = "";
  telefono: number = null;
  Marca: string = "";
  Modelo: string = "";
  Patente: string = "";
  constructor(public toastController: ToastController, private alertController: AlertController) {
  }
    validarconductor() {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.clave != this.clave1) {

          this.Contra();
        }
        else if (this.clave.length != 8) {
          this.Largo();
        }
        else if (this.clave == "" || this.nombre == "" || this.apellido == "" || this.direccion == "" || this.telefono == null || this.correo == "") {
          this.Vacio();
        }
        else if (!re.test(this.correo)) {
          this.Corre();

        }
        else if (this.Patente.length != 6){
          this.Largop();
        }
        else if(this.Marca == "" || this.Modelo == "" || this.Patente == ""){
          this.Vacio();
        }


  }
  ngOnInit() {
  }

  async Corre() {
    const toast = await this.toastController.create({
      message: 'Correo invalido',
      duration: 4000
    });
    toast.present();
  }
  async Contra() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Contraseña no coinciden',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async Largo() {
    const toast = await this.toastController.create({
      message: 'Largo contraseña no valido debe ser mayor a 8',
      duration: 4000
    });
    toast.present();
  }
  async Vacio() {
    const toast = await this.toastController.create({
      message: 'Debe llenar los campos',
      duration: 4000
    });
    toast.present();
  }
  async Largop() {
    const toast = await this.toastController.create({
      message: 'La patente no cumple con el largo',
      duration: 4000
    });
    toast.present();
  }


}
