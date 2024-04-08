import { Component, OnInit, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
//import { NativeGeocoderPlugin } from '@capgo/nativegeocoder';


/*
  LA FUNCION NATIVEGEOCODER FUE REMOVIDA POR GOOGLE DE ANDROID POR CUESTIONES DE SEGURIDAD,
  POR TAL MOTIVO NO ES POSIBLE HACER LA CONVERSION COMO SE REALIZABA ANTES.
  -HE QUITADO EL CODIGO QUE HACIA REFERENCIA AL GEOCODING
  -TEN EN CUENTA LOS PROBLEMAS DE SEGURIDAD QUE SE DAN POR LA UTILIZACION DE LA LOCALIZACION
    EN TIEMPO REAL.
  -GOOGLE NO TE VA PERMITIR UTILIZAR ESTA FUNCION PARA MOSTRAR LA POSICION DE LOS USUARIOS EN TIEMPO REAL DENTRO DEL
    MAPA, PORQUE SOLO SE ESTA PERMITIDO VER UNICAMENTE TU POSICION EN TIEMPO REAL...
    -- ESTO FUE REMOVIDO DEBIDO A PROBLEMAS DE SEGURIDAD EN LOS QUE SE VIERON INVOLUCRADAS
      PERSONAS EN MEXICO Y USA --
  -COMO CONSEJO TE DIGO QUE NO IMPLEMENTES ESTA FUNCION, BUSCA OTRA MANERA DE IMPLEMENTARLA

  npm install @awesome-cordova-plugins/native-geocoder -> NO SE PUEDE UTILIZAR MAS, DESACTIVALA O QUITALA
                                                          :) 
*/

@Component({
  selector: 'app-mapaprincipal',
  templateUrl: './mapaprincipal.page.html',
  styleUrls: ['./mapaprincipal.page.scss'],
})
export class MapaprincipalPage implements OnInit {

  //Variables para el mapa
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  latM: any; //= 43.1746;
  lngM: any; //= -2.4125;
  zoom = 15;

  //map: any;
  public lat: any;
  public lon: any;

  constructor(
    private ngZone: NgZone,
    //private nativegeocoder: NativeGeocoderPlugin
    //private userLocation: LocalizaProductoService
  ) {
    this.mapbox.accessToken = environment.mapToken;
   }

  ngOnInit() {
    
    this.CurrentPosition();
  
  }

  async CurrentPosition(){
    let Options = {
      enableHighAccuracy:true,

    }
    
    const coordinates = await Geolocation.getCurrentPosition(Options);
  
    //console.log('Current position:', coordinates);
    this.latM = coordinates.coords.latitude;
    this.lngM = coordinates.coords.longitude;
    this.CargarMapa(this.latM, this.lngM);
    //this.ObtenerDireccion(this.latM, this.lngM);


  }

  CargarMapa(lat:any, lon: any){
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [lon, lat],
      
    });
    const marker2 = new mapboxgl.Marker({ color: '#673BB7' }).setLngLat([lon, lat]).addTo(this.map);
      //.setPopup(new mapboxgl.Popup().setHTML("<h1 class='animate__animated animate__shakeY'>Hello World!</h1>"))
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  /*ObtenerDireccion(lat:any, lon: any){
    
    //native geocoder
    let options = {
      useLocale: true,
      maxResults: 5,
      latitude: lat,
      longitude: lon,
    };

    this.nativegeocoder.reverseGeocode(options)
      .then((result: any) =>{
      console.log("DIRECCION: ",JSON.stringify(result[0]))
    }).catch((error: any) => console.log(error));
  }*/

}
