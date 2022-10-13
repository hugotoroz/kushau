import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { toUnicode } from 'punycode';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-mainconductor',
  templateUrl: './mainconductor.page.html',
  styleUrls: ['./mainconductor.page.scss'],
})
export class MainconductorPage implements OnInit {
  latitud: any;
  longitud: any;
  markerId: string;

  constructor(private geolocation: Geolocation, protected platform: Platform) {
    
  }

  ngOnInit() {
    this.getGeolocation();
    
    
  }
  ionViewDidEnter() {
    
    this.createMap();
    

  }
  //laat=localStorage.getItem('lat');
  //lngg=localStorage.getItem('lng');


  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  //GEO LOCALIZACION
  getGeolocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude
      this.longitud = resp.coords.longitude

      //localStorage.setItem('lat',this.laat)

      //localStorage.setItem('lng',this.lnng)
      console.log(this.latitud);
      console.log(this.longitud);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
  //CREAR EL MAPA
  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: {
            lat: this.latitud,
            lng: this.longitud,
          },
          zoom: 16,
        },

      });
      console.log('newmap', this.newMap);

      //await this.addMarker(this.laat, this.lnng);
      //await this.addListeners();
    }
    catch (e) {
      console.log(e);
      // alert(e);
    }
  }
  /*
  async setCamera() {
    // Move the map programmatically
    await this.newMap.setCamera({
      coordinate: {
        // lat: this.center.lat,
        // lng: this.center.lng,
        lat: 28.782991, 
        lng: 76.945626,
      },
      zoom: 13,
      // animate: true
    });

    // Enable traffic Layer
    await this.newMap.enableTrafficLayer(true);

    if(Capacitor.getPlatform() !== 'web') {
      await this.newMap.enableIndoorMaps(true);
      // await this.newMap.setMapType(MapType.Satellite);
    }


    await this.newMap.setPadding({
        top: 50,
        left: 50,
        right: 0,
        bottom: 0,
      });
  }
  */
 /*
  //AÑADIR MARCADOR
  async addMarker(lat, lng) {
    // Add a marker to the map
    if (this.markerId) this.removeMarker();
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      // title: ,
      draggable: true
    });
  }
  //BORRAR MARCADOR
  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }
  */
  async locate() {
    if (this.newMap) await this.newMap.enableCurrentLocation(true);
  }

  
  /*
  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      console.log('setOnMarkerClickListener', event);
      this.removeMarker(event.markerId);
    });

    await this.newMap.setOnCameraMoveStartedListener((event) => {
      console.log(event);
    });

    await this.newMap.setOnCameraIdleListener((event) => {
      console.log('idle: ', event);
      this.laat = event.latitude,
        this.lnng = event.longitude

      this.addMarker(this.laat, this.lnng);
    });

    await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });
    
    await this.newMap.setOnMyLocationButtonClickListener((event) => {
      console.log('setOnMyLocationButtonClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });
    
    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });
  }
  */
}
