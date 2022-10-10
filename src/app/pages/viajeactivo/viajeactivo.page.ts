import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-viajeactivo',
  templateUrl: './viajeactivo.page.html',
  styleUrls: ['./viajeactivo.page.scss'],
})
export class ViajeactivoPage implements OnInit {

  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController,private servicioDB: BasededatosService) { }
  num: number= 2000;
  arregloViaje: any=[
    {
      id_viaje2:'',
      descripcion2:'',
      precio3: '',
      fila3:'',
      asientos_disp3: '',
      nombre3: '',
      patente3: '',
      auto3:'',
      nombre_comuna3:'',
    }
  ]
  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.fetchDetalleV().subscribe(item=>{
          this.arregloViaje = item;
        })

      }
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
          text: 'Sí, quiero cancelarlo',
          handler: () => {
            this.navCtrl.navigateRoot('/tabs');
            this.presentToast();
          }
         }, {
          text: 'No quiero cancelarlo',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/tabs');
          }
        }
     ]
    });

    await alert.present();
  }
}
