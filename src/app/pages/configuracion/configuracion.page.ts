import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiCamaraService } from 'src/app/services/api-camara.service';
import { BasededatosService } from 'src/app/services/basededatos.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  imagen:any;
  foto:'';
  nom: '';
  app: '';
  tel: '';
  vehiculo: '';
  area: string=" +569"
  usuario = localStorage.getItem('usuario');

  constructor(public toastController: ToastController,private router: Router,private activedRouter: ActivatedRoute,public navCtrl: NavController,private alertController: AlertController,private servicioDB: BasededatosService,private camara:ApiCamaraService) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.nom= this.router.getCurrentNavigation().extras.state.n;
        this.app= this.router.getCurrentNavigation().extras.state.ap;
        this.tel= this.router.getCurrentNavigation().extras.state.tel;
        this.imagen =this.router.getCurrentNavigation().extras.state.foto1;
      }
    })
   }
  validarEditar(){    
    
    if(this.nom == "" || this.app == "" ||this.tel == ""){
      this.presentToast("Debe completar todos los campos.");
    }
    
    else if (this.tel['length'] < 8 || this.tel['length'] > 8){
      this.presentToast("El telefono debe contener 8 dígitos.");
    }
    else{
      
      this.servicioDB.actPerfil(this.nom,this.app,this.tel,this.foto,this.usuario);
      this.router.navigate(['tabs/']);
    }

  }
  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
  CambiarFoto(){
    this.camara.tomarFoto();
  }
  
  ngOnInit() {
    this.camara.fetchFoto().subscribe(item=>{
      this.foto = item;
    })
  }

}
