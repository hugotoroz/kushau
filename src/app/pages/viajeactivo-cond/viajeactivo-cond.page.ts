import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-viajeactivo-cond',
  templateUrl: './viajeactivo-cond.page.html',
  styleUrls: ['./viajeactivo-cond.page.scss'],
})
export class ViajeactivoCondPage implements OnInit {
  num: number= 2000;
  id2:any ="";
  arregloDetalle: any=[{
    precio:'',
    comuna:'',
    correo:''
  }]
  constructor(private alertController: AlertController,public navCtrl: NavController,private router: Router,private activedRouter: ActivatedRoute,public toastController: ToastController,private servicioDB: BasededatosService) {
   }
  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.id2 = this.servicioDB.idDV;
      this.servicioDB.filtrarDetalle(this.id2)
      this.servicioDB.fetchDetalleV().subscribe(item=>{
        this.arregloDetalle = item
      })
    })
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu viaje ha sido cancelado exitosamente.',
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
            this.navCtrl.navigateRoot('/tabconductor');
            this.presentToast();
          }
         }, {
          text: 'No',
          cssClass: 'alert-button-confirm',

        }
     ]
    });
    await alert.present();
  }
}
