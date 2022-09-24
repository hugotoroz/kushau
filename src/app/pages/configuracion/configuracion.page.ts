import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  Nombre: string="Hugo";
  Apellidos: string="Salas Messi";
  Direccion: string="Estero 228";
  Telefono: string="12345678";
  Correo: string="algo@dominio.algo"
  area: string=" +569"
  
  constructor(public toastController: ToastController,private router: Router,public navCtrl: NavController,private alertController: AlertController) { }
  validarEditar(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (this.Telefono.length != 8){
      this.presentToast("El telefono debe contener 8 dígitos.");
    }
    else if(this.Nombre == "" || this.Apellidos == "" || this.Direccion == ""||this.Telefono == ""||this.Correo == "" ){
      this.presentToast("Debe completar todos los campos.");
    }
    else if(!re.test(this.Correo)) {
      this.presentToast("Su correo no es válido.");
      
    }
    else{
      this.router.navigate(['tabs/'])
      
      this.presentToast("Tu perfil ha sido modificado correctamente.");
    }

  }
  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
  
  ngOnInit() {
  }

}
