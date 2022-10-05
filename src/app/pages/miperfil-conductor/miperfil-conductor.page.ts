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
    {correo4:'',
    nombre4:'',
    apellido4:'',
    nombreCompleto4: '',
    vehiculo:'',
    telefonoC:''
    }
  ]

  usuario = localStorage.getItem('usuario');
  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController, private activedRouter: ActivatedRoute, private router: Router,private servicioDB: BasededatosService) { }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.buscarPerfilC(this.usuario);
      if(res){
        this.servicioDB.fetchPerfilC().subscribe(item=>{
          this.arregloUsuario = item;
          
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
      }
    }
    this.router.navigate(['/configuracion-conductor']);
    this.router.navigate(['/configuracion-conductor'], navigationExtras);
  }
}
