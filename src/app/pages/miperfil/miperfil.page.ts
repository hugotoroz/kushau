import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  Nombre: string="Hugo Salas Messi";
  Direccion: string="Estero 228";
  Telefono: string="+569 12345678";
  Correo: string="algo@dominio.algo"
  constructor() { }

  ngOnInit() {
  }

}
