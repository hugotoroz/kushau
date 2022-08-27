import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registrarauto',
  templateUrl: './registrarauto.page.html',
  styleUrls: ['./registrarauto.page.scss'],
})
export class RegistrarautoPage implements OnInit {

  Marca: string="";
  Modelo: string="";
  Patente: string="";
  constructor(public toastController: ToastController) { }
  validarAuto(){
    if (this.Patente.length != 6){
      this.Largo();
    }
    else if(this.Marca == "" || this.Modelo == "" || this.Patente == ""){
      this.Vacio();
    }

  }
  async Largo() {
    const toast = await this.toastController.create({
      message: 'La patente no cumple con el largo',
      duration: 4000
    });
    toast.present();
  }
  ngOnInit() {
  }
  async Vacio() {
    const toast = await this.toastController.create({
      message: 'Debe llenar los campos',
      duration: 4000
    });
    toast.present();
  }

}
