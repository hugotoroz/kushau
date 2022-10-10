import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-tomarauto',
  templateUrl: './tomarauto.page.html',
  styleUrls: ['./tomarauto.page.scss'],
})
export class TomarautoPage implements OnInit {
  num: number= 2000;
  usuario = localStorage.getItem('usuario');
  arregloViaje: any=[
    {
      id_viaje2:'',
      descripcion2:'',
      precio3: '',
      fila3:'',
      asientos_disp3: '',
      nombre3: '',
      patente3: '',
      auto3:'',
      nombre_comuna3:'',
    }
  ]
  // variable
  estado: string="Mostrar Filas";
  private Desplegarimagen: boolean = false;
  // function
  desplegarImgen() {
    this.Desplegarimagen = !this.Desplegarimagen;
    this.estado= "Mostrar Filas";
    if (this.Desplegarimagen) {
      this.estado="Ocultar Filas";
    }
  }


  constructor(private servicioDB: BasededatosService,private router: Router) { }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.fetchMostrarV().subscribe(item=>{
          this.arregloViaje = item;
        })

      }
    })
  }
  Tomar(){
    this.servicioDB.tomarViaje(this.usuario,this.arregloViaje[0].id_viaje2)
    this.router.navigate(['/viajeactivo'])
  }

}
