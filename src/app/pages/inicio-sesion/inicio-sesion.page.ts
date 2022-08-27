import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  usuario: string="";
  clave: string="";

  constructor(public toastController: ToastController,private router: Router,private alertController: AlertController,public navCtrl: NavController) { }

  ngOnInit() {
  }

  validarUsuario(){
    if (this.usuario != "") {
      this.presentToast();
    
    }
    else if (this.clave != "") {
      this.presentToast();
      
    }
    else{
      this.router.navigate(['/tabs'])
    }

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['OK'],
    });

    await alert.present();
  }

}




