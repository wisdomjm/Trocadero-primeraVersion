import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  latM: any; //= 43.1746;
  lngM: any; //= -2.4125;
  zoom = 15;
  //####################################

  productoActual: any;
  _idVendedor: any;
  idUsuario: any;


  imagenProductoPrincipal: any;
  videoPrincipal: string = "";
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
    imagenes:{},
    video:{},
    carritoClienteId:'',
    historialClienteId:'',
  };

  pregunta: any = {}
    //idProducto: any,
    //mipregunta: ''
  

  preguntasDelProducto: any = [];

  //map: any;
  public lat: any;
  public lon: any;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude



  constructor(
    public rutaActual: ActivatedRoute,
    private basededatos: CrudproductosService,
    public route: Router
  ) { 
    this.mapbox.accessToken = environment.mapToken;
  }

  ngOnInit() {
    this.productoActual = this.rutaActual.snapshot.paramMap.get('nombreProducto');
    this._idVendedor = this.rutaActual.snapshot.paramMap.get('idVendedor');
    this.idUsuario = localStorage.getItem('userID');

    //console.log("El nombre del Producto es: ", this.productoActual);
    //console.log("El Vendedor es: ", this._idVendedor);

    //this.getCurrentPosition();
    this.CargarLaInformacionDelProducto(this.productoActual,this._idVendedor);
    this.CargarLasPreguntasRealizadas();
    
    //this.CargarMapa();

    navigator.geolocation.getCurrentPosition((position: any) => {
      
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.CargarMapa(this.lat, this.lon);
      //console.log("Tu Posicion es: ", this.lat +" - "+this.lon);
      //this.GeoleafletMap(this.lat, this.lon);
      
    });


  }

  GuardarInformacionEnHistorial(){
    this.productoEncontrado.imagenes = this.imagenProductoPrincipal;
    this.productoEncontrado.historialClienteId = this.idUsuario;
    const productoAgregar = this.productoEncontrado;//producto a agregar
    this.basededatos.RegistrarProductosEnHistorialDeCompra(productoAgregar).then(() =>{
      console.log("se registro en historial");
    }).catch((err =>{
      console.log("error al registrar el producto: ",err);
    }))
  }

  

  CargarMapa(lat:any, lon: any){
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [lon, lat],
      
    });
    const marker2 = new mapboxgl.Marker({ color: '#673BB7' }).setLngLat([lon, lat]).addTo(this.map);


    this.map.addControl(new mapboxgl.NavigationControl());
  }

  /*getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          //this.CargarMapa(this.lat, this.lon);
          console.log("Tu Posicion es: ", this.lat +" - "+this.lon);
          //this.GeoleafletMap(this.lat, this.lon);
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }*/

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
          this.productoEncontrado.video = produc.video;
          this.pregunta.idProducto = produc.nombre;

          if(produc.imagenes.length > 0){
            this.imagenProductoPrincipal = produc.imagenes[0];
          }

          this.videoPrincipal = produc.video[0];
          if(produc.video.length > 0){
            
          }
        }
        this.todaslasimagenes = produc.imagenes;
        this.GuardarInformacionEnHistorial();
        //console.log("URL VIDEO: ",this.videoPrincipal);
        //console.log("EL ###########: ",this.productoEncontrado.imagenes);
      })
      
    },(error) =>{
      this.basededatos.MensajeDeVerificacion("Error al cargar la Informacion del Producto");
      //console.error('Error al buscar productos en el componente', error);
    });
    
  }

  AgregarAlCarrito(){

    this.productoEncontrado.imagenes = this.imagenProductoPrincipal;
    this.productoEncontrado.carritoClienteId = this.idUsuario;
    const productoAgregar = this.productoEncontrado;//producto a agregar

    this.basededatos.agregarProductoAlCarrito(productoAgregar).then((res) =>{
      //console.log("Se agrego al carrito");
      this.basededatos.MensajeDeVerificacion("Se agrego al carrito de Compras");
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
      //console.log("Se Registro una pregunta...");
    }).catch((err) =>{
      this.basededatos.MensajeDeVerificacion("Error al registrar la pregunta");
      //console.log("Error al registrar la pregunta: ", err);
    }).finally(() =>{
      this.pregunta.mipregunta = '';
      this.CargarLasPreguntasRealizadas();
    })
  }

  CargarLasPreguntasRealizadas(){
    this.basededatos.cargarPreguntasPorIdProducto(this.productoActual).subscribe((res) =>{
      res.forEach(produc =>{
        if(produc.idProducto == this.productoActual){
          this.preguntasDelProducto = res;
        }
      })
      
      this.preguntasDelProducto = res;
    },(erro) =>{
      this.basededatos.MensajeDeVerificacion("Error al cargar las preguntas");
      //console.log("Error al cargar las preguntas: ",erro);
    })
  }

  Comprar(){
    /* routerLink="/paginadepago" */
    this.route.navigate(['paginadepago/',
      this.productoEncontrado.nombre,
      this.productoEncontrado.idVendedor,
      this.productoEncontrado.precio,
      this.productoEncontrado.cantidadDisponible,
      this.productoEncontrado.descripcionCorta,
      this.imagenProductoPrincipal
    ]);
  }
}
