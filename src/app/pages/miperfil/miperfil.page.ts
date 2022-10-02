import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  arregloUsuario: any=[
    {
      correo2:'',
      nombre2:'',
      apellido2:'',
      nombreCompleto2: '',
      telefono:''
    }
  ]


  usuario = localStorage.getItem('usuario');
  constructor(private alertController: AlertController,public navCtrl: NavController, public toastController: ToastController, private activedRouter: ActivatedRoute, private router: Router,private servicioDB: BasededatosService) { 
    
  }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.fetchperfil().subscribe(item=>{
          this.arregloUsuario = item;
          this.servicioDB.buscarPerfil(this.usuario);
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
      header: 'Cancelar viaje',
      message: '¿Estás seguro que deseas cerrar sesión?',
      cssClass:'boton-registro',
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
      n: this.arregloUsuario[1],
      ap: this.arregloUsuario[2],
      tel:this.arregloUsuario[4],

    }
  }
  this.router.navigate(['/configuracion'], navigationExtras);
}

}
