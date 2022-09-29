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
      precio3: '',
      asientos_disp3: '',
      tA_patente3: '',
      nombre3: '',
      nombre_comuna3: '',
    }
  ]


  constructor(private activedRouter: ActivatedRoute, private router: Router,private servicioDB: BasededatosService) {
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
        this.servicioDB.fetchActivos().subscribe(item=>{
          this.arregloViaje = item;
        })

      }
    })
  }

}

