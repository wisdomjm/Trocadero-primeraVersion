import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

import { CrudproductosService } from '../Services/crudproductos.service';
import Producto from 'src/Models/Producto';


@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.page.html',
  styleUrls: ['./detalleproducto.page.scss'],
})
export class DetalleproductoPage implements OnInit {

  //Variables para el mapa
  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v12`;
  // Coordenadas de la localización donde queremos centrar el mapa
  latM = 43.1746;
  lngM = -2.4125;
  zoom = 15;
  //####################################

  productoActual: any;
  _idVendedor: any;

  imagenProductoPrincipal: any;
  todaslasimagenes: any = [];

  productoEncontrado: Producto = {
    nombre:'',
    descripcionCorta:'',
    descripcionLarga:'', 
    categoria:'',
    precio:0,
    cantidadDisponible:0,
    idVendedor:'',
    fechaCreacion:'',
    imagenes:{}
  };

  pregunta: any = {
    idProducto: '',
    mipregunta: ''
  }

  preguntasDelProducto: any = [];

  //map: any;
  public lat: any;
  public lon: any;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude



  constructor(
    public rutaActual: ActivatedRoute,
    private basededatos: CrudproductosService
  ) { 
    this.mapbox.accessToken = environment.mapToken;
  }

  ngOnInit() {
    this.productoActual = this.rutaActual.snapshot.paramMap.get('nombreProducto');
    this._idVendedor = this.rutaActual.snapshot.paramMap.get('idVendedor');
    

    //console.log("El nombre del Producto es: ", this.productoActual);
    //console.log("El Vendedor es: ", this._idVendedor);

    this.getCurrentPosition();
    this.CargarLaInformacionDelProducto(this.productoActual,this._idVendedor);
    this.CargarLasPreguntasRealizadas();
    this.CargarMapa();


  }

  

  CargarMapa(){
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lngM, this.latM]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          console.log("Tu Posicion es: ", this.lat +" - "+this.lon);
          //this.GeoleafletMap(this.lat, this.lon);
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  CargarLaInformacionDelProducto(producto: any, idvendedor: any){
    this.basededatos.buscarProductosPorNombre(producto).subscribe((resp) =>{
      //console.log("EL PRODUCTO ES: ",resp);
      resp.forEach(produc =>{
        if(produc.idVendedor == idvendedor){
          this.productoEncontrado.nombre = produc.nombre;
          this.productoEncontrado.descripcionCorta = produc.descripcionCorta;
          this.productoEncontrado.descripcionLarga = produc.descripcionLarga;
          this.productoEncontrado.categoria = produc.categoria;
          this.productoEncontrado.precio = produc.precio;
          this.productoEncontrado.cantidadDisponible = produc.cantidadDisponible;
          this.productoEncontrado.idVendedor = produc.idVendedor;
          this.pregunta.idProducto = produc.nombre;

          if(produc.imagenes.length > 0){
            this.imagenProductoPrincipal = produc.imagenes[0];
          }
        }
        this.todaslasimagenes = produc.imagenes;
        //console.log("EL ###########: ",this.productoEncontrado.imagenes);
      })
      
    },(error) =>{
      this.basededatos.MensajeDeVerificacion("Error al cargar la Informacion del Producto");
      //console.error('Error al buscar productos en el componente', error);
    });
    
  }

  AgregarAlCarrito(){

    this.productoEncontrado.imagenes = this.imagenProductoPrincipal;
    const productoAgregar = this.productoEncontrado;//producto a agregar

    this.basededatos.RegistrarProductosEnCarritoDeCompra(productoAgregar).then((res) =>{
      //console.log("Se agrego al carrito");
    }).catch((err) =>{
      this.basededatos.MensajeDeVerificacion("Error al registrar el producto");
      //console.log("Error al registrar el producto: ",err);
    });

  }

  CambiarImagenAMostrar(imagen: any){
    this.imagenProductoPrincipal = imagen;
  }

  EnviarPregunta(){
    this.basededatos.RegistrarUnaPreguntaEnUnProducto(this.pregunta).then((res)=>{
      console.log("Se Registro una pregunta...");
    }).catch((err) =>{
      this.basededatos.MensajeDeVerificacion("Error al registrar la pregunta");
      //console.log("Error al registrar la pregunta: ", err);
    }).finally(() =>{
      this.pregunta.mipregunta = '';
      this.CargarLasPreguntasRealizadas();
    })
  }

  CargarLasPreguntasRealizadas(){
    this.basededatos.cargarPreguntasPorIdProducto(this.productoEncontrado.nombre).subscribe((res) =>{
      this.preguntasDelProducto = res;
    },(erro) =>{
      this.basededatos.MensajeDeVerificacion("Error al cargar las preguntas");
      //console.log("Error al cargar las preguntas: ",erro);
    })
  }
}
