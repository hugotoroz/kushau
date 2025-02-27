import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-formv',
  templateUrl: './formv.page.html',
  styleUrls: ['./formv.page.scss'],
})
export class FormvPage implements OnInit {
  direccion: string="";
  fila: number=null;
  precio: number=null;
  descrip: string="";
  asientos: number=null;
  idDv: any;
  
  boleano:any;
  usuario = localStorage.getItem('usuario');
  estado1: string="Empezado";
  listaComuna: any=[
    {
      id_comuna:'',
      nombre_comuna:''

    }
 
  ]

  listaPatente: any=[
    {
      patente1: ''

    }
  ];
  listaid:any=[{
    idViaje:''
  }];

  // variable
  estado: string="Mostrar Filas"
  private Desplegarimagen: boolean = false;

  constructor(public toastController: ToastController,public navCtrl: NavController,public alertController: AlertController,private activedRouter: ActivatedRoute,private router: Router,private servicioDB: BasededatosService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.boleano= this.router.getCurrentNavigation().extras.state.bol;
      }
    })
   }

  ngOnInit() {
    //Suscribirse al obervable del id

    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.obtenerPatente(this.usuario)
      if(res){
        this.servicioDB.fetchComuna().subscribe(item=>{
          this.listaComuna = item;
        })
        this.servicioDB.fetchPatente().subscribe(item=>{
          this.listaPatente = item;
        })
        this.servicioDB.fetchIDv().subscribe(item=>{
          this.listaid = item;
        })

      }
    })

  }
  // function
  desplegarImgen() {
    this.Desplegarimagen = !this.Desplegarimagen;
    this.estado= "Mostrar Filas";
    
    if (this.Desplegarimagen) {
      this.estado="Ocultar Filas";
    }
  }
  validar(){
    if(this.direccion == "" || this.fila == NaN || this.precio == NaN || this.descrip == ""|| this.asientos== null){
      this.presentToast("Debe completar todos los campos.");
    }
    else if (this.fila < 1 || this.fila >8){
      this.presentToast("La fila debe ser un número entre 1 y 8.");

    }
    else if(this.precio < 1000){
      this.presentToast("El precio debe ser mayor a $1000 pesos.");
    }
    else if(this.asientos== 0 || this.asientos > 6 ){
      this.presentToast("La cantidad de asientos debe ser entre 1 a 6");
    }
    else{
      this.servicioDB.insertarViaje(this.descrip,this.precio,this.fila,this.asientos,this.listaPatente[0].patente1,this.direccion)
      this.idDv = this.servicioDB.idDV;
      //Pasar datos al viaje activo del conductor.
      let navigationExtras: NavigationExtras = {
        state: {
          id: this.idDv,
          nComuna: this.listaComuna[0].nombre_comuna,
          precio: this.precio,
          asientos: this.asientos,
          bol:this.boleano

        }
      }
      this.router.navigate(['/viajeactivo-cond'],navigationExtras)
      this.router.navigate(['/carga'])
      this.alerta();
    }
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 4000
    });
    toast.present();
  }
  
  async alerta() {
    let navigationExtras: NavigationExtras = {
      state: {
        bol:this.boleano

      }
    }
    const alert = await this.alertController.create({
      header: 'Viaje creado',
      cssClass:'boton-registro',
      message: 'Viaje creado exitosamente.',
      buttons: [
        {
          text: 'Ver viaje',
          handler: () => {
            this.router.navigate(['/viajeactivo-cond'],navigationExtras);
          }
         }
     ]
    });
    await alert.present();
  }
}
