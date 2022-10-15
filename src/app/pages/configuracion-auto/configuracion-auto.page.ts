import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';
@Component({
  selector: 'app-configuracion-auto',
  templateUrl: './configuracion-auto.page.html',
  styleUrls: ['./configuracion-auto.page.scss'],
})
export class ConfiguracionAutoPage implements OnInit {
  patente: '';
  marca: '';
  modelo: '';
  annio:'';
  usuario = localStorage.getItem('usuario');
  constructor(public toastController: ToastController,private router: Router,private activedRouter: ActivatedRoute,public navCtrl: NavController,private alertController: AlertController,private servicioDB: BasededatosService) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.patente= this.router.getCurrentNavigation().extras.state.p;
        this.modelo= this.router.getCurrentNavigation().extras.state.mo;
        this.marca= this.router.getCurrentNavigation().extras.state.mar;
        this.annio= this.router.getCurrentNavigation().extras.state.an;
      }
    })
   }

  ngOnInit() {
  }
  
  validarEditar(){    
    
    if(this.patente == "" || this.modelo == "" ||this.marca == ""||this.annio == ""){
      this.presentToast("Debe completar todos los campos.");
    }
    /*
    else if (this.patente['length'] < 6 || this.patente['length'] > 6){
      this.presentToast("La patente debe contener solo 6 dígitos.");
    }*/
    /*
    else if (this.annio['length'] < 4 || this.patente['length'] > 4){
      this.presentToast("Escriba un año válido.");
    }*/
    /*
    else if(this.annio > 2022){
      this.presentToast("El año del vehiculo no puede ser mayor a 2022");
    }*/
    else{
      this.servicioDB.actAuto(this.modelo,this.marca,this.annio,this.usuario);
      this.router.navigate(['tabconductor/']);
    }

  }
  
  
  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
}
