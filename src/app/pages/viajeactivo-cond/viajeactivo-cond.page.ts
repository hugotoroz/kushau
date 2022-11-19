import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-viajeactivo-cond',
  templateUrl: './viajeactivo-cond.page.html',
  styleUrls: ['./viajeactivo-cond.page.scss'],
})
export class ViajeactivoCondPage implements OnInit {
  num: number= 2000;
  idV:any ="";
  bandera:boolean=false;
  boleano:any;
  cambia:number =1;
  nocambia:number =0;

  prueba:boolean;

  latitude = localStorage.getItem('laat');
  long= localStorage.getItem('lng');
  arregloDetalle: any=[{
    precio:'',
    comuna:'',
    correo:''
  }]
  usuario = localStorage.getItem('usuario');
  idDD= localStorage.getItem('idDv');
  constructor(private alertController: AlertController,public navCtrl: NavController,private router: Router,private activedRouter: ActivatedRoute,public toastController: ToastController,private servicioDB: BasededatosService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.boleano= this.router.getCurrentNavigation().extras.state.bol;
      }
    })
   }
  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.idV = this.servicioDB.idDV;
      this.servicioDB.filtrarDetalle(this.idDD)

      this.servicioDB.fetchDetalleV().subscribe(item=>{
        this.arregloDetalle = item
        if(this.idDD.length < 1){
          this.prueba = true
          
        }
        else{
          this.prueba = false
        }
      })
      
    })
  }
  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

volverMenu(){
  let navigationExtras: NavigationExtras = {
    state: {
      bol:this.cambia

    }
  }
  this.router.navigate(['/tabconductor'],navigationExtras);
}
cancelarViaje(){
  let navigationExtras: NavigationExtras = {
    state: {
      bol:this.nocambia

    }
  }
  this.servicioDB.cancelarViaje(this.idDD);
  this.idV="";
  this.presentToast("Tu viaje ha sido cancelado.")
  this.router.navigate(['/tabconductor'],navigationExtras);
}

terminarViaje(){
  let navigationExtras: NavigationExtras = {
    state: {
      bol:this.nocambia

    }
  }
  this.servicioDB.terminarViaje(this.idDD);
  this.servicioDB.darBono(this.usuario); 
  this.presentToast("Tu viaje ha terminado.")
  localStorage.setItem('idDv',"");
  this.router.navigate(['/tabconductor'],navigationExtras);
  
}
  async presentAlert(msj) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  
  

}
