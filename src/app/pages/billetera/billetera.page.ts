import { Component, OnInit } from '@angular/core';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {
  num: number= 60000;
  constructor(private servicioDB: BasededatosService) { }
  bono: any=[{
    bono1:''
  }];
  arregloUsuario: any=[
    {
      correo4:'',
      nombre4:'',
      apellido4:'',
      nombreCompleto4: '',
      vehiculo:'',
      telefonoC:'',
      foto1:''
    }
  ]

  usuario = localStorage.getItem('usuario');
  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.buscarBono(this.usuario);
      this.servicioDB.fetchBono().subscribe(item=>{
        this.bono = item;
      })
      this.servicioDB.fetchPerfilC().subscribe(item=>{
        this.arregloUsuario = item;
      })
    })
    
  }
}


