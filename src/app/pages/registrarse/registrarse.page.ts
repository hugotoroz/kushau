import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, ToggleChangeEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  nombre:string="";
  apellido: string="";
  clave: string="";
  clave1: string="";
  correo: string="";
  direccion: string="";
  telefono : number=null;
  element: boolean = false;
  usuario1: string = "";
  conductor: boolean = false;

  

  constructor(public toastController: ToastController,private alertController: AlertController,private router: Router) { 

  }
  validarUsuario(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.clave != this.clave1) {

      this.Contra();
    }
    else if(this.clave.length != 8){
      this.Largo();
    }
    else if(this.clave == "" || this.nombre == "" || this.apellido == "" || this.direccion == "" || this.telefono == null || this.correo == ""){
      this.Vacio();
    }
    else if(!re.test(this.correo)) {
      this.Corre();
      
    }
    else if(this.conductor){
      this.router.navigate(['/tabconductor'])

    }
    else if(this.conductor == false){
      this.router.navigate(['/tabs'])

    }

  } 
  toggleChanged(event){
    if(this.conductor){
      this.element = true
    }
    else{
      this.element = false

    }
  }
  ngOnInit() {
  }
  async Corre() {
    const toast = await this.toastController.create({
      message: 'Correo invalido',
      duration: 4000
    });
    toast.present();
  }
  async Contra() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Contraseña no coinciden',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async Largo() {
    const toast = await this.toastController.create({
      message: 'Largo contraseña no valido debe ser mayor a 8',
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
  usuario: any[] = [
    {
      id: 1,
      nombre: 'Conductor'
    },
    {
      id: 2,
      nombre: 'Usuario'
    }
  ]
  
  

}
