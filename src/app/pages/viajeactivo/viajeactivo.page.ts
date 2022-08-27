import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-viajeactivo',
  templateUrl: './viajeactivo.page.html',
  styleUrls: ['./viajeactivo.page.scss'],
})
export class ViajeactivoPage implements OnInit {

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
            this.navCtrl.navigateRoot('/tabs');
            this.presentToast();
          }
         }, {
          text: 'No quiero cancelarlo',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/tabs');
          }
        }
     ]
    });

    await alert.present();
  }
}
