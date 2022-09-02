import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-configuracion-conductor',
  templateUrl: './configuracion-conductor.page.html',
  styleUrls: ['./configuracion-conductor.page.scss'],
})
export class ConfiguracionConductorPage implements OnInit {
  Nombre: string="Ignacio";
  Apellidos:string="Salas Messi";
  Direccion: string="Estero Si";
  Telefono: string="12345678";
  Correo: string="si@dominio.si";
  vehiculo: string="Nissan Skyline GTR 32";
  area: string=" +569"
  constructor(public toastController: ToastController,private router: Router,public navCtrl: NavController,private alertController: AlertController) { }
  validarEditar(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (this.Telefono.length != 8){
      this.Largo();
    }
    else if(this.Nombre == "" || this.Apellidos == "" || this.Direccion == ""||this.Telefono == ""||this.Correo == "" ){
      this.Vacio();
    }
    else if(!re.test(this.Correo)) {
      this.Corre();
      
    }
    else{
      this.router.navigate(['tabconductor/'])
      this.presentToast();
    }

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu perfil ha sido modificado correctamente.',
      duration: 2000
    });
    toast.present();
  }
  async Largo() {
    const toast = await this.toastController.create({
      message: 'El telefono no tienes 8 digitos',
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
  async Corre() {
    const toast = await this.toastController.create({
      message: 'Correo invalido',
      duration: 4000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
