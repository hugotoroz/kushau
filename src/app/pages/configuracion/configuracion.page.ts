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
  arregloUsuario: any=[
    {
      correo2:'',
      nombre2:'',
      apellido2:'',
      nombreCompleto2: '',
      telefono:'',
      foto2:''
    }
  ]
  boleano :any=1;
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
      if(this.foto == ''){
        this.servicioDB.actPerfil(this.nom,this.app,this.tel,this.arregloUsuario[0].foto2,this.usuario);
        this.router.navigate(['tabs/']);
      }
      else{
        this.servicioDB.actPerfil(this.nom,this.app,this.tel,this.foto,this.usuario);
        this.router.navigate(['tabs/']);
      }

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
    this.boleano = 0;
  }
  
  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.buscarPerfil(this.usuario);
      if(res){
        this.servicioDB.fetchperfil().subscribe(item=>{
          this.arregloUsuario = item;
        })
      }
    })
    this.camara.fetchFoto().subscribe(item=>{
      this.foto = item;
    })
  }

}
