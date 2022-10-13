import { Component } from '@angular/core';
//import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(protected platform:Platform) {
    /*
    this.platform.ready().then(async()=>{
      this.getGeolocation();
    })
    */
  }
  laat:any;
  lnng:any;
  /*
  getGeolocation(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.laat=resp.coords.latitude
      localStorage.setItem('lat',this.laat)

      this.lnng=resp.coords.longitude
      localStorage.setItem('lng',this.lnng)
      
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
 */

}
