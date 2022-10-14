import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-miperfil-conductor',
  templateUrl: './miperfil-conductor.page.html',
  styleUrls: ['./miperfil-conductor.page.scss'],
})
export class MiperfilConductorPage implements OnInit {
  arregloUsuario: any=[
    {
      correo4:'',
      nombre4:'',
      apellido4:'',
      nombreCompleto4: '',
      vehiculo:'',
      telefonoC:'',
      foto1:''
    }
  ]
  arregloAuto: any=[
    {
      patente:'',
      modelo:'',
      marca:'',
      annio:''

    }
  ]
  usuario = localStorage.getItem('usuario');
  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController, private activedRouter: ActivatedRoute, private router: Router,private servicioDB: BasededatosService) { }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.buscarPerfilC(this.usuario);
      this.servicioDB.buscarAutoC(this.usuario);
      if(res){
        this.servicioDB.fetchPerfilC().subscribe(item=>{
          this.arregloUsuario = item;
          
        })
        this.servicioDB.fetchAutoC().subscribe(item=>{
          this.arregloAuto = item;
          
        })
          
        
      }
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
      header: 'Cerrar sesión',
      cssClass:'boton-registro',
      message: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cerrar sesión',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/inicio-sesion');
            this.presentToast("Has cerrado sesión.");
            localStorage.removeItem('usuario');
          }
        },
        {
          text: 'No'
         }

     ]
    });
    await alert.present();
  }
  pasarDatos(){
    let navigationExtras: NavigationExtras = {
      state: {
        n: this.arregloUsuario[0].nombre4,
        ap: this.arregloUsuario[0].apellido4,
        tel:this.arregloUsuario[0].telefonoC,
        foto:this.arregloUsuario[0].foto1
      }
    }
    this.router.navigate(['/configuracion-conductor']);
    this.router.navigate(['/configuracion-conductor'], navigationExtras);
  }
  pasarDatosV(){
    let navigationExtras: NavigationExtras = {
      state: {
        p: this.arregloAuto[0].patente,
        mo: this.arregloAuto[0].modelo,
        mar:this.arregloAuto[0].marca,
        an:this.arregloAuto[0].annio
      }
    }
    this.router.navigate(['/configuracion-auto']);
    this.router.navigate(['/configuracion-auto'], navigationExtras);
  }
}
