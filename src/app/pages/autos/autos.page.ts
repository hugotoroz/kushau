import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {
  usu = localStorage.getItem('usuario');
  validarViajeActivo= localStorage.getItem('usuViaje');
  boleano:any;
  noViajes: boolean=false;
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
  arregloUsuario: any=[
    {
      correo2:'',
      nombre2:'',
      apellido2:'',
      nombreCompleto2: '',
      telefono:'',
      foto2:''
    }
  ]
  arregloViajeAct: any=[
    {
      u_correo:''
    }
  ]


  constructor(private sisi: ActivatedRoute, private router: Router,private servicioDB: BasededatosService) {
    
   }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.buscarPerfil(this.usu);
      if(res){
        this.servicioDB.fetchActivos().subscribe(item=>{
          this.arregloViaje = item;
          if (this.arregloViaje[0] == undefined || this.arregloViaje[0].id_viaje3 == '') {
            this.noViajes=true;
          }
          
        })
        this.servicioDB.fetchperfil().subscribe(item=>{
          this.arregloUsuario = item;
        })
        this.servicioDB.fetchValidarViajeUsuario().subscribe(item=>{
          this.arregloViajeAct= item;

        })
        this.servicioDB.validarViajeU(this.usu);

      }
    })
  }

  viaje(x){
    this.validarViajeActivo= localStorage.getItem('usuViaje');
    if (this.arregloUsuario[0].nombre2 == '' || this.arregloUsuario[0].apellido2 == '' || this.arregloUsuario[0].apellido2 == 0) {
      this.servicioDB.presentAlert("Debe completar los datos de su perfil para poder tomar un viaje.")
    }
    
    else if (this.validarViajeActivo == null){
      localStorage.setItem('usuViaje', "");
    }
    else if (this.validarViajeActivo!= ''){
      this.servicioDB.presentAlert("Usted ya tiene un viaje activo. Revise el botón 'Viaje activo' para ver su viaje actual. ");
    }
    
    else{
      this.servicioDB.mostrarViaje(x.id_viaje3);
      this.router.navigate(['/tomarauto']);
      
    }
  }
  activo(){
    this.validarViajeActivo= localStorage.getItem('usuViaje');
    if (this.validarViajeActivo == null){
      localStorage.setItem('usuViaje', "");
    }
    else if (this.validarViajeActivo == ''){
      this.servicioDB.presentAlert("Usted todavía no tiene un viaje activo. ");
    }
    else{
      this.router.navigate(['/viajeactivo']);
    }
  }

}

