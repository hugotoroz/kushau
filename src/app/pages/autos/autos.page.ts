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


  constructor(private sisi: ActivatedRoute, private router: Router,private servicioDB: BasededatosService) {
    console.log(this.boleano);
    this.sisi.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.boleano= this.router.getCurrentNavigation().extras.state.bol;
        
      }
    })
   }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.buscarPerfil(this.usu);
      if(res){
        this.servicioDB.fetchActivos().subscribe(item=>{
          this.arregloViaje = item;
          if (this.arregloViaje[0] == undefined){
            this.noViajes=true;
          }
        })
        this.servicioDB.fetchperfil().subscribe(item=>{
          this.arregloUsuario = item;
        })
      }
    })
  }
  viaje(x){
    if (this.arregloUsuario[0] == undefined || this.arregloUsuario[0].apellido2 == null) {
      this.servicioDB.presentAlert("Debe completar los datos de su perfil para poder tomar un viaje.")
    }else{
      this.servicioDB.mostrarViaje(x.id_viaje3);
      let navigationExtras: NavigationExtras = {
        state: {
          bol: this.boleano,
        }
      }
      this.router.navigate(['/tomarauto'],navigationExtras);
    }
  }
  activo(){
    let navigationExtras: NavigationExtras = {
      state: {
        bol: this.boleano,
  
      }
    }
    this.router.navigate(['/viajeactivo'],navigationExtras);
  }

}

