import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';
@Component({
  selector: 'app-mainconductor',
  templateUrl: './mainconductor.page.html',
  styleUrls: ['./mainconductor.page.scss'],
})
export class MainconductorPage implements OnInit {

  markerId: string; 
  boleano:any;
  crearViaje:boolean;
  usu = localStorage.getItem('usuario')
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
  arregloAuto: any=[
    {
      patente:'',
      modelo:'',
      marca:'',
      annio:''

    }
  ]
  arregloViaje: any=[
    {
      u_correo:'',

    }
  ]
  constructor(private geolocation: Geolocation, protected platform: Platform,private sisi:ActivatedRoute,private router: Router,private servicioDB: BasededatosService) {

  }

  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      this.servicioDB.buscarPerfilC(this.usu);
      this.servicioDB.buscarAutoC(this.usu);
      this.servicioDB.buscarViajeCond(this.arregloViaje[0].u_correo);
      if(res){
        this.servicioDB.fetchPerfilC().subscribe(item=>{
          this.arregloUsuario = item;
        })

        this.servicioDB.fetchAutoC().subscribe(item=>{
          this.arregloAuto = item;
        })

        this.servicioDB.fetchbuscarViajeConductor().subscribe(item=>{
          this.arregloViaje= item;
          if (this.arregloViaje[0] == undefined || this.arregloViaje[0].u_correo != this.usu ){
            this.crearViaje=true;
          }
          else if(this.arregloViaje[0].u_correo == this.usu){
            this.crearViaje=false;
          }
        })
      }
    })       
  }
  ionViewDidEnter() {
  
    this.createMap();
  }
  iniciar(){
    if (this.arregloUsuario[0] == undefined || this.arregloUsuario[0].apellido4 == null){
      this.servicioDB.presentAlert("Debe completar los datos de su perfil para poder crear un viaje.")
    }
    else if(this.arregloAuto[0] == undefined || this.arregloAuto[0].modelo == null){
      this.servicioDB.presentAlert("Debe completar los datos de su vehículo para poder crear un viaje.")
    }else{
      let navigationExtras: NavigationExtras = {
        state: {
          bol: this.boleano,
        }
      }
      this.router.navigate(['/formv'],navigationExtras)
    }
  }
activo(){
  let navigationExtras: NavigationExtras = {
    state: {
      bol: this.boleano,

    }
  }
  this.router.navigate(['/viajeactivo-cond'],navigationExtras)
}
  latGet=localStorage.getItem('lat');
  longGet=localStorage.getItem('lng');


  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  //GEO LOCALIZACION

  //CREAR EL MAPA
  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: {
            lat: parseFloat(this.latGet),
            lng: parseFloat(this.longGet),
          },
          zoom: 16,
        },

      });
      console.log('newmap', this.newMap);
      this.locate();
      //await this.addMarker(this.laat, this.lnng);
      //await this.addListeners();
    }
    catch (e) {
      console.log(e);
      // alert(e);
    }
  }
  async locate() {
    if (this.newMap) await this.newMap.enableCurrentLocation(true);
  }
  handleRefresh(event) {
    setTimeout(() => {
        if (this.arregloViaje[0] == undefined || this.arregloViaje[0].u_correo != this.usu){
          this.crearViaje=true;
        }
        else if(this.arregloViaje[0].u_correo == this.usu){
          this.crearViaje=false;
        }
      event.target.complete();
    }, 2000);
  };
}
