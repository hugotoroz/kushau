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

  latitude = localStorage.getItem('laat');
  long= localStorage.getItem('lng');

  arregloDetalle: any=[{
    precio:'',
    comuna:'',
    correo:''
  }]
  usuario = localStorage.getItem('usuario');
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
      this.servicioDB.filtrarDetalle(this.idV)
      this.servicioDB.fetchDetalleV().subscribe(item=>{
        this.arregloDetalle = item
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
  this.servicioDB.cancelarViaje(this.idV);
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
  this.servicioDB.terminarViaje(this.idV);
  this.servicioDB.darBono(this.usuario); 
  this.presentToast("Tu viaje ha terminado.")
  this.idV="";
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
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
