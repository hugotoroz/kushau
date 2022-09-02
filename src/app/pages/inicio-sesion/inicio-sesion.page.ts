import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  
  usuario: string="";
  clave: string="";
  u: string="";
  constructor(public toastController: ToastController,private router: Router,private alertController: AlertController,public navCtrl: NavController,public loading: LoadingController) { }

  ngOnInit() {
  }

  async validarUsuario(){
    if ((this.usuario == "usuario") && (this.clave == "usuario")) {
      await this.loadingUI();
       this.router.navigate(['/tabs'])
       this.usuario=""
       this.clave=""
    
    }
    else if ((this.usuario == "conductor") && (this.clave =="conductor")){
      await this.loadingUI();
      await this.router.navigate(['/tabconductor'])
      this.usuario=""
      this.clave=""

    }
    else{
      this.presentToast();
    
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

  async loadingUI() {

    let loadingUI = await this.loading.create({
      message: 'Iniciando Sesión',
      duration: 500
      
    });
    return await loadingUI.present();

  }

}




