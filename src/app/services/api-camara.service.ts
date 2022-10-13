import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCamaraService {
  foto:any;
  listaFotos = new BehaviorSubject([]);

  fetchFoto(): Observable<any> {

    return this.listaFotos.asObservable();
  }
  constructor(private camera:Camera) { }
  tomarFoto(){
    const options:CameraOptions={
      quality : 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE

    }
    this.camera.getPicture(options).then((imageData=>{
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.foto=base64Image;
      this.listaFotos.next(this.foto);
      
    }))
  }
}
