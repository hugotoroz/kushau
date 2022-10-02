import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  nom: '';
  app: '';
  tel: '';
  area: string=" +569"


  constructor(public toastController: ToastController,private router: Router,private activedRouter: ActivatedRoute,public navCtrl: NavController,private alertController: AlertController) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.nom= this.router.getCurrentNavigation().extras.state.n;
        this.app= this.router.getCurrentNavigation().extras.state.ap;
        this.tel= this.router.getCurrentNavigation().extras.state.tel;
      }
    })
   }
  validarEditar(){    
    if (this.tel.length != 8){
      this.presentToast("El telefono debe contener 8 dígitos.");
    }
    else if(this.nom == "" || this.app == "" ||this.tel == ""){
      this.presentToast("Debe completar todos los campos.");
    }
    else{
      this.router.navigate(['tabs/'])
      
      this.presentToast("Tu perfil ha sido modificado correctamente.");
    }

  }
  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
  
  ngOnInit() {
  }

}
