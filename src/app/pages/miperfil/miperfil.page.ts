import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  Correo: string="algo@dominio.algo";
  u:string="";
  ap:string="";
  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController, private activedRouter: ActivatedRoute, private router: Router) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.u= this.router.getCurrentNavigation().extras.state.usu;
        this.ap= this.router.getCurrentNavigation().extras.state.app;
        
      }
    })
  }

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
      header: '¿Estás seguro que deseas cerrar sesión?',
      cssClass:'boton-registro',
      buttons: [
        {
          text: 'No.',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/tabs/miperfil');
          }
        },
        {
          text: 'Cerrar sesión.',
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
