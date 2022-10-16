import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {
  u:string="";
  ap:string="";
  boleano:any;


  id:string="";
  arregloViaje: any=[
    {
      id_viaje3:'',
      precio3: '',
      asientos_disp3: '',
      patente3: '',
      foto3:'',
      nombre3: '',
      nombre_comuna3: '',
    }
  ]


  constructor(private sisi: ActivatedRoute, private router: Router,private servicioDB: BasededatosService) {
    console.log(this.boleano);
    this.sisi.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.u= this.router.getCurrentNavigation().extras.state.usu;
        this.ap= this.router.getCurrentNavigation().extras.state.app;
        this.boleano= this.router.getCurrentNavigation().extras.state.bol;
        
      }
    })
   }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.fetchActivos().subscribe(item=>{
          this.arregloViaje = item;
        })
        
      }
    })
  }
  viaje(x){
    this.servicioDB.mostrarViaje(x.id_viaje3);
    let navigationExtras: NavigationExtras = {
      state: {
        bol: this.boleano,

      }
    }
    this.router.navigate(['/tomarauto'],navigationExtras);
  }
  activo(){
    let navigationExtras: NavigationExtras = {
      state: {
        bol: this.boleano,
  
      }
    }
    this.router.navigate(['/viajeactivo'],navigationExtras);
  }

}

