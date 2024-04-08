import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizaProductoService {

  public userLocation?:[number, number];

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor() { }

  public async getUserLocation(): Promise<[number, number]>{
    return new Promise((resolve, reject) =>{
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude]; 
          resolve(this.userLocation);
          console.log()
        },
        (err) =>{
          console.log('No se obtuvo la geolocalizacion: ',err);
          reject();
        }
      );
    })
  }


}
