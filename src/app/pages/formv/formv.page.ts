import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
  now = new Date();

  usuario = localStorage.getItem('usuario');

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
  // variable
  estado: string="Mostrar Filas";
  private Desplegarimagen: boolean = false;

  constructor(public toastController: ToastController,public alertController: AlertController, private router: Router,private servicioDB: BasededatosService) { }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.obtenerPatente(this.usuario)
      if(res){
        this.servicioDB.fetchComuna().subscribe(item=>{
          this.listaComuna = item;
        })
        this.servicioDB.fetchPatente().subscribe(item=>{
          this.listaPatente = item;
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
    if(this.direccion == "" || this.fila == NaN || this.precio == NaN || this.descrip == ""){
      this.presentToast("Debe completar todos los campos.");
    }
    else if (this.fila < 1 || this.fila >8){
      this.presentToast("La fila debe ser un número entre 1 y 8.");

    }
    else if(this.precio < 1000){
      this.presentToast("El precio debe ser mayor a $1000 pesos.");
    }
    else if(this.asientos > 6 || this.asientos < 0){
      this.presentToast("La cantidad de asientos debe ser entre 1 a 6");
    }
    else{
      this.servicioDB.insertarViaje(this.descrip,this.precio,this.fila,this.now,this.asientos,this.listaPatente[0].patente1,this.direccion);
      this.presentToast("Viaje iniciado con éxito.");
      this.router.navigate(['/viajeactivo-cond'])
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
