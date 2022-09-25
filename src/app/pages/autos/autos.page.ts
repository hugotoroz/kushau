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
  arregloViaje: any=[
    {
      id_viaje: '',
      Descripcion: '',
      Precio: '',
      Direccion: '',
      correoc: ''
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
        this.servicioDB.fetchViaje().subscribe(item=>{
          this.arregloViaje = item;
        })
      }
    })
  }

}

