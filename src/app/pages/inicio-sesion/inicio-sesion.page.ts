import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { BasededatosService } from 'src/app/services/basededatos.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  usuario: string="";
  clave: string=""; 
  latitud: any;
  longitud: any;
  api:any=[
    {
      id: '',
      nombre: '',
      clave: '',
      id_rol: ''
    }
  ]
  apellido="Salas Messi";
  tel=12345678;
  foto="../../assets/Imagenes/shalas.jpg"
  bono = 0;
  correo="a@a.com"
  rol=1;

  apellido1="Salas Messi";
  tel1=12345678;
  foto1="../../assets/Imagenes/usuario.jpeg"
  bono1 = 0;
  correo1="b@b.com"
  rol1=2;


  datos: any = {
    correo3: '',
    tipo: ''
  }
  constructor(private geolocation: Geolocation, public toastController: ToastController,private router: Router,private alertController: AlertController,public navCtrl: NavController,public loading: LoadingController,private servicioDB: BasededatosService,public apirest:ApiRestService) { }

  ngOnInit() {
    this.getGeolocation();
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.fetchLogin().subscribe(item=>{
          this.datos = item;
        })
      }
    })
    this.apirest.getUsers().subscribe((item)=>{
      this.api = item;
      this.servicioDB.insertarU(this.correo,this.api[0].nombre,this.apellido,this.tel,this.api[0].clave,this.bono,this.foto,this.rol1)
      this.servicioDB.insertarU(this.correo1,this.api[1].nombre,this.apellido1,this.tel1,this.api[1].clave,this.bono1,this.foto1,this.rol)
    });
    
  }


validarUsuario(){
  var usuarioValidado= this.usuario.toLowerCase().replace(/\s/g, "");
  if (usuarioValidado == "" || this.clave == "") {
    this.presentAlert("Inicio sesión","Debe rellenar todos los campos");
  
  }
  else{
    this.getGeolocation();
    this.servicioDB.loginUsuario(usuarioValidado,this.clave);
    localStorage.setItem('usuario',usuarioValidado)
    this.loadingUI();
    this.usuario=""
    this.clave=""
    
  }
}


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
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

  getGeolocation() {
    

    this.geolocation.getCurrentPosition().then((resp) => {
      
      this.latitud = resp.coords.latitude
      this.longitud = resp.coords.longitude
      localStorage.setItem('lat',this.latitud)
      localStorage.setItem('lng',this.longitud)
      console.log(this.latitud);
      console.log(this.longitud);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

}




