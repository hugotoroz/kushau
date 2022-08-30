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
  Patente: string="";
  Marca: string="";
  Modelo: string ="";


  
  

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
      if (this.Patente.length != 6){
        this.Largop();

      }
      else if(this.Marca == "" || this.Modelo == "" || this.Patente == ""){
        this.Vacio();
      }
      else{
      this.router.navigate(['/tabconductor'])
      }

    }
    else if(this.conductor == false){
      this.router.navigate(['/tabs'])

    }

  } 
  async Largop() {
    const toast = await this.toastController.create({
      message: 'La patente no cumple con el largo',
      duration: 4000
    });
    toast.present();
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
      message: 'Escriba un correo válido.',
      duration: 4000
    });
    toast.present();
  }
  async Contra() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Las contraseñas no coinciden.',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async Largo() {
    const toast = await this.toastController.create({
      message: 'El largo contraseña debe ser mayor a 8 caracteres.',
      duration: 4000
    });
    toast.present();
  }
  async Vacio() {
    const toast = await this.toastController.create({
      message: 'Debe completar todos los campos.',
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
