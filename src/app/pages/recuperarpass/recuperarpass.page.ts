import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperarpass',
  templateUrl: './recuperarpass.page.html',
  styleUrls: ['./recuperarpass.page.scss'],
})
export class RecuperarpassPage implements OnInit {
  correo: string = "";
  clave: string = "";
  clave1: string = "";
  element: boolean = false;
  estado: string = "Continuar"

  constructor(public toastController: ToastController, private alertController: AlertController,private router: Router) { }
  validarUsuario() {
    if (this.correo == 'a@a.com') {
      this.estado = "Cambiar clave"
      this.element = true
    }
    else if (this.correo == "") {
      this.Vacio();
    }
    
    else{
      this.invalido();
    }

  }
  validarCampos() {
    if (this.clave != this.clave1) {

      this.Contra();
    }
    else if (this.clave.length < 8) {
      this.Largo();
    }
    else if (this.clave == "" || this.correo == "") {
      this.Vacio();
    }
    else{
      this.correcto();
      this.router.navigate(['/inicio-sesion'])
      
    }
  }
  ngOnInit() {
  }
  async Contra() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Las contraseñas no coinciden.',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async Vacio() {
    const toast = await this.toastController.create({
      message: 'Debe completar todos los campos.',
      duration: 4000
    });
    toast.present();
  }
  async Largo() {
    const toast = await this.toastController.create({
      message: 'El largo contraseña debe ser mayor a 8 caracteres.',
      duration: 4000
    });
    toast.present();
  }  
  async invalido() {
    const toast = await this.toastController.create({
      message: 'Correo no existe o es invalido',
      duration: 4000
    });
    toast.present();
  }
  async correcto() {
    const toast = await this.toastController.create({
      message: 'Se ha cambiado la contraseña correctamente',
      duration: 4000
    });
    toast.present();
  }

}
