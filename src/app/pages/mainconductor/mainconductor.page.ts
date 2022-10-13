import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mainconductor',
  templateUrl: './mainconductor.page.html',
  styleUrls: ['./mainconductor.page.scss'],
})
export class MainconductorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.createMap();
  }
  laat=localStorage.getItem('lat')
  lngg=localStorage.getItem('lng');
  
  
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any ={
    lat: -33.2860241,
    lng: -70.8859415
  };  
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: this.center,
        zoom: 15,
      },
    });
  }
  
}
