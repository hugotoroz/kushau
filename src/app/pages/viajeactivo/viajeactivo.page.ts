import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-viajeactivo',
  templateUrl: './viajeactivo.page.html',
  styleUrls: ['./viajeactivo.page.scss'],
})
export class ViajeactivoPage implements OnInit {

  constructor(private sisi:ActivatedRoute,private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController,private servicioDB: BasededatosService, private router: Router) {
    
   }
  usu = localStorage.getItem('usuario');
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

  async cancelarViaje(){
    const alert = await this.alertController.create({
      header: 'Salir del viaje',
      cssClass:'boton-registro',
      message: '¿Está seguro que desea salir del viaje?',
      buttons: [
        {
          text: 'Salir del viaje',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.servicioDB.cancelarViajeU(this.usu,this.arregloViaje[0].id_viaje2);
            this.servicioDB.salirDelViaje(this.arregloViaje[0].id_viaje2);
            this.router.navigate(['/tabs']);
            
          }
        },
        {
          text: 'No'
         }
     ]
    });
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu viaje ha sido cancelado exitosamente.',
      duration: 2000
    });
    toast.present();
  }


  volverMenu(){
    
    this.router.navigate(['/tabs']);
  
  }
}


