import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tomarauto',
  templateUrl: './tomarauto.page.html',
  styleUrls: ['./tomarauto.page.scss'],
})
export class TomarautoPage implements OnInit {
  num: number= 2000;
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
