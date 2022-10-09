import { Component, OnInit } from '@angular/core';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-tomarauto',
  templateUrl: './tomarauto.page.html',
  styleUrls: ['./tomarauto.page.scss'],
})
export class TomarautoPage implements OnInit {
  num: number= 2000;
  arregloViaje: any=[
    {
      precio3: '',
      asientos_disp3: '',
      fila:'',
      nombre3: '',
      patente3: '',
      vehiculo:'',
      nombre_comuna3: '',
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


  constructor(private servicioDB: BasededatosService) { }

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
