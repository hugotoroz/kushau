import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viajeactivo',
  templateUrl: './viajeactivo.page.html',
  styleUrls: ['./viajeactivo.page.scss'],
})
export class ViajeactivoPage implements OnInit {

  constructor(private sisi:ActivatedRoute,private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController,private servicioDB: BasededatosService, private router: Router) {
    this.sisi.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.boleano= this.router.getCurrentNavigation().extras.state.bol;
      }
    })
   }
   usu = localStorage.getItem('usuario');
  boleano:any;
  num: number= 2000;
  cambia:number =1;
  nocambia:number =0;
  latGet=localStorage.getItem('lat');
  longGet=localStorage.getItem('lng');
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
        this.servicioDB.fetchMostrarV().subscribe(item=>{
          this.arregloViaje = item;
        })

      }
    })
  }

  cancelarViaje(){
    let navigationExtras: NavigationExtras = {
      state: {
        bol:this.nocambia
  
      }
    }
    this.servicioDB.cancelarViajeU(this.usu,this.arregloViaje[0].id_viaje2);
    this.router.navigate(['/tabs'],navigationExtras);
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu viaje ha sido cancelado exitosamente.',
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
    this.router.navigate(['/tabs'],navigationExtras);
  
  }
}
