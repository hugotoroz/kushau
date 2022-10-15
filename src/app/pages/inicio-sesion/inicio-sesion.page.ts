import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';



@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  usuario: string="";
  clave: string=""; 
  

  

  datos: any = {
    correo3: '',
    tipo: ''
  }
  constructor(public toastController: ToastController,private router: Router,private alertController: AlertController,public navCtrl: NavController,public loading: LoadingController,private servicioDB: BasededatosService,) { }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.fetchLogin().subscribe(item=>{
          this.datos = item;
        })
      }
    })
  }

validarUsuario(){
  var usuarioValidado= this.usuario.toLowerCase().replace(/\s/g, "");
  if (usuarioValidado == "" || this.clave == "") {
    this.presentAlert("Inicio sesión","Debe rellenar todos los campos");
  
  }
  else{
    this.servicioDB.loginUsuario(usuarioValidado,this.clave);
    localStorage.setItem('usuario',usuarioValidado)
    
    this.usuario=""
    this.clave=""
    
  }
}


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async loadingUI() {

    let loadingUI = await this.loading.create({
      message: 'Iniciando Sesión',
      duration: 500
      
    });
    return await loadingUI.present();

  }

}




