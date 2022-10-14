import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viajeactivo-cond',
  templateUrl: './viajeactivo-cond.page.html',
  styleUrls: ['./viajeactivo-cond.page.scss'],
})
export class ViajeactivoCondPage implements OnInit {
  num: number= 2000;
  idV:any ="";
  bandera:boolean=false;

  latitude = localStorage.getItem('laat');
  long= localStorage.getItem('lng');

  arregloDetalle: any=[{
    precio:'',
    comuna:'',
    correo:''
  }]

  constructor(private alertController: AlertController,public navCtrl: NavController,private router: Router,private activedRouter: ActivatedRoute,public toastController: ToastController,private servicioDB: BasededatosService) {
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
  async alerta() {
    const alert = await this.alertController.create({
      header: 'Cancelar viaje',
      cssClass:'boton-registro',
      message: '¿Estás seguro que deseas cancelar tu viaje?',
      buttons: [
        {
          text: 'Cancelar viaje',
          handler: () => {
            this.servicioDB.cancelarViaje(this.idV);
            this.router.navigate(['/tabconductor']);
            this.idV="";
            this.presentToast("Tu viaje ha sido cancelado exitosamente.");
          }
         }, {
          text: 'No',
          cssClass: 'alert-button-confirm',
        }
     ]
    });
    await alert.present();
  }
  async alerta2() {
    const alert = await this.alertController.create({
      header: 'Terminar viaje',
      cssClass:'boton-registro',
      message: '¿Estás seguro que deseas terminar tu viaje?',
      buttons: [
        {
          text: 'Terminar viaje',
          handler: () => {
            this.servicioDB.terminarViaje(this.idV);
            this.servicioDB.darBono(this.idV)
            this.router.navigate(['/tabconductor']);
            this.idV="";
            this.presentToast("Tu viaje ha terminado exitosamente.");
          }
         }, {
          text: 'No',
          cssClass: 'alert-button-confirm',
        }
     ]
    });
    await alert.present();
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
