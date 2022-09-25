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
  num1: number= 2000;
  num2: number= 5000;

  arregloConductores: any = [
    {

    }
  ]
  arregloVehiculos: any=[
    {

    }
  ]
  arregloViaje: any=[
    {

    }
  ]

  constructor(private activedRouter: ActivatedRoute, private router: Router,private servicioDB: BasededatosService ) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.u= this.router.getCurrentNavigation().extras.state.usu;
        this.ap= this.router.getCurrentNavigation().extras.state.app;
        
      }
    })
   }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.fetchConductores().subscribe(item=>{
          this.arregloConductores = item;
        })
        this.servicioDB.fetchVehiculo().subscribe(item1 =>{
          this.arregloVehiculos =item1;
        })
        this.servicioDB.fetchViaje().subscribe(viaje=>{
          this.arregloViaje = viaje;
        })
      }
    })
  }

}

