import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';
@Component({
  selector: 'app-registrarauto',
  templateUrl: './registrarauto.page.html',
  styleUrls: ['./registrarauto.page.scss'],
})
export class RegistrarautoPage implements OnInit {
  booleano:boolean=true;
  patente:string=""
  modelo:string=""
  marca:string=""
  annio:number=null
  usuario = localStorage.getItem('usuario');

  constructor(public toastController: ToastController ,private servicioDB: BasededatosService,private router: Router,public navCtrl: NavController, private activedRouter: ActivatedRoute) { }
  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      
    })
  }
  validarAuto(){
    if (this.patente.length != 6){
      this.presentToast("Escriba una patente correcta.");
    }
    else if(this.marca == "" || this.modelo == "" || this.annio == null){
      this.presentToast("Debe completar todos los campos.");
    }
    else{
      let NavigationExtras: NavigationExtras = {
        state: {
          bolAuto: this.booleano,
  
        }
      }
      this.servicioDB.agregarV(this.patente.toUpperCase(),this.modelo,this.marca,this.annio,this.usuario);
      this.router.navigate(['/tabconductor']);
      this.router.navigate(['/tabconductor'], NavigationExtras);
    }
  }
  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 4000
    });
    toast.present();
  }

}
