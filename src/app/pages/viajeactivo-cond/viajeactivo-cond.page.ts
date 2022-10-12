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
  ngAfterViewInit() {
    this.createMap();
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
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any ={
    lat: -33.2860241,
    lng: -70.8859415
  };
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: this.center,
        zoom: 13,
      },
    });
  }
}
