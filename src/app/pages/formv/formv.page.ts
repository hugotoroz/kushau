import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formv',
  templateUrl: './formv.page.html',
  styleUrls: ['./formv.page.scss'],
})
export class FormvPage implements OnInit {
  Direccion: string="";
  Fila: string="";
  Precio: string="";
  
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

  constructor() { }

  ngOnInit() {
  }

}
