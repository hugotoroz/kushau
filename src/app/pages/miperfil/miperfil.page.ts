import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  Nombre: string="Hugo Salas Messi";
  Direccion: string="Estero 228";
  Telefono: string="+569 12345678";
  Correo: string="algo@dominio.algo"
  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController) { }

  ngOnInit() {
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Has cerrado sesión.',
      duration: 2000
    });
    toast.present();
  }
  async alerta() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      cssClass:'boton-registro',
      message: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Sí, deseo cerrar sesión',
          handler: () => {
            this.navCtrl.navigateRoot('/inicio-sesion');
            this.presentToast();
          }
         }, {
          text: 'No, no deseo cerrar sesión.',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/tabs/miperfil');
          }
        }
     ]
    });

    await alert.present();
  }
}
