import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-miperfil-conductor',
  templateUrl: './miperfil-conductor.page.html',
  styleUrls: ['./miperfil-conductor.page.scss'],
})
export class MiperfilConductorPage implements OnInit {
  Nombre: string="Ignacio Salas Messi";
  Direccion: string="Estero Si";
  Telefono: string="+569 12345678";
  Correo: string="si@dominio.si";
  vehiculo: string="Nissan Skyline GTR 32";
  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController, private activedRouter: ActivatedRoute, private router: Router) { }

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
          text: 'No, no deseo cerrar sesión.',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/tabconductor/miperfil-conductor');
          }
        },
        {
          text: 'Sí, deseo cerrar sesión',
          handler: () => {
            this.navCtrl.navigateRoot('/inicio-sesion');
            this.presentToast();
          }
         }

     ]
    });
    await alert.present();
  }
}
