import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-viajeactivo-cond',
  templateUrl: './viajeactivo-cond.page.html',
  styleUrls: ['./viajeactivo-cond.page.scss'],
})
export class ViajeactivoCondPage implements OnInit {
  num: number= 2000;
  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController) { }

  ngOnInit() {
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu viaje ha sido cancelado exitosamente.',
      duration: 2000
    });
    toast.present();
  }
  async alerta() {
    const alert = await this.alertController.create({
      header: 'Cancelar viaje',
      cssClass:'boton-registro',
      message: '¿Estás seguro que deseas cancelar tu viaje?',
      buttons: [
        {
          text: 'Sí, quiero cancelarlo',
          handler: () => {
            this.navCtrl.navigateRoot('/tabconductor');
            this.presentToast();
          }
         }, {
          text: 'No quiero cancelarlo',
          cssClass: 'alert-button-confirm',

        }
     ]
    });

    await alert.present();
  }
}
