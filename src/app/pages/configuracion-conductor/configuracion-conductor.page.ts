import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { ApiCamaraService } from 'src/app/services/api-camara.service';
@Component({
  selector: 'app-configuracion-conductor',
  templateUrl: './configuracion-conductor.page.html',
  styleUrls: ['./configuracion-conductor.page.scss'],
})
export class ConfiguracionConductorPage implements OnInit {
  boleano :any=1;
  imagen:any;
  foto:'';
  nom: '';
  app: '';
  tel: '';
  area: string=" +569"
  usuario = localStorage.getItem('usuario');
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

  constructor(public toastController: ToastController,private router: Router,private activedRouter: ActivatedRoute,public navCtrl: NavController,private alertController: AlertController,private servicioDB: BasededatosService,private camara:ApiCamaraService) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.nom= this.router.getCurrentNavigation().extras.state.n;
        this.app= this.router.getCurrentNavigation().extras.state.ap;
        this.tel= this.router.getCurrentNavigation().extras.state.tel;
        
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
        this.servicioDB.actPerfil(this.nom,this.app,this.tel,this.arregloUsuario[0].foto1,this.usuario);
      this.router.navigate(['tabconductor/']);
      }
      else{
        this.servicioDB.actPerfil(this.nom,this.app,this.tel,this.foto,this.usuario);
        this.router.navigate(['tabconductor/']);
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
      this.servicioDB.buscarPerfilC(this.usuario);
      if(res){
        this.servicioDB.fetchPerfilC().subscribe(item=>{
          this.arregloUsuario = item;
        })
      }
    })
    this.camara.fetchFoto().subscribe(item=>{
      this.foto = item;
    })
  }

}
