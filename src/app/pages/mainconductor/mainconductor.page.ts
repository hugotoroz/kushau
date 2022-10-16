import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-mainconductor',
  templateUrl: './mainconductor.page.html',
  styleUrls: ['./mainconductor.page.scss'],
})
export class MainconductorPage implements OnInit {

  markerId: string; 
  boleano:any;

  

  constructor(private geolocation: Geolocation, protected platform: Platform,private sisi:ActivatedRoute,private router: Router) {
    this.sisi.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.boleano= this.router.getCurrentNavigation().extras.state.bol;
      }
    })
  }

  ngOnInit() {    
  }
  ionViewDidEnter() {
    
    this.createMap();
    

  }
  iniciar(){
    let navigationExtras: NavigationExtras = {
      state: {
        bol: this.boleano,

      }
    }
    this.router.navigate(['/formv'],navigationExtras)
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
}
