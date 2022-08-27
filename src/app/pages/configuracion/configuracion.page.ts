import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


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
  
  constructor(public toastController: ToastController,private router: Router) { }
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
      this.router.navigate(['/miperfil'])

    }

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
