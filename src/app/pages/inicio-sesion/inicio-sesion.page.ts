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
  bono = 0;
  apiUsuario:any=[
    {
      id: '',
      nombre: '',
      clave: '',
      id_rol: ''
    }
  ]
  apiAuto:any=[
    {
      patente:'',
      marca:'',
      id_usuario:''
      
    }
  ]
  datos: any = {
    correo3: '',
    tipo: '',

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
    });

    this.apirest.getUsers().subscribe((item)=>{
      this.apiUsuario = item;
      //Usuario conductor.
      this.servicioDB.insertarU(JSON.stringify(this.apiUsuario[0].id),this.apiUsuario[0].nombre,this.apiUsuario[0].clave,this.bono,this.apiUsuario[0].id_rol);
      //Insertar auto al usuario conductor.
      this.apirest.getAutos().subscribe((item)=>{
        this.apiAuto = item;
        this.servicioDB.insertarA(this.apiAuto[0].patente,this.apiAuto[0].marca,this.apiAuto[0].id_usuario )
      });
      //Usuarios pasajeros.
      this.servicioDB.insertarU(JSON.stringify(this.apiUsuario[1].id),this.apiUsuario[1].nombre,this.apiUsuario[1].clave,this.bono,this.apiUsuario[1].id_rol);
      this.servicioDB.insertarU(JSON.stringify(this.apiUsuario[2].id),this.apiUsuario[2].nombre,this.apiUsuario[2].clave,this.bono,this.apiUsuario[2].id_rol);
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
    this.usuario="";
    this.clave="";
    
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


  //Pruebas unitarias
  obtenerLS():any []{
    const arr = JSON.parse(localStorage.getItem('si'));
    
    return arr || [];
  }
}




