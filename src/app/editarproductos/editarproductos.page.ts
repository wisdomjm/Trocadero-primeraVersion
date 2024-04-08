import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CrudproductosService } from '../Services/crudproductos.service';
import Producto from 'src/Models/Producto';

@Component({
  selector: 'app-editarproductos',
  templateUrl: './editarproductos.page.html',
  styleUrls: ['./editarproductos.page.scss'],
})
export class EditarproductosPage implements OnInit {

  //Variables
  productoActual: any;
  _idProducto: any;

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
    uuid:''
  };

  imagenProductoPrincipal: any;
  todaslasimagenes: any = [];

  constructor(
    public rutaActual: ActivatedRoute,
    public route: Router,
    private basededatos: CrudproductosService,
  ) { }

  ngOnInit() {
    this.productoActual = this.rutaActual.snapshot.paramMap.get('nombreProducto');
    this._idProducto = this.rutaActual.snapshot.paramMap.get('idProducto');

    //console.log("El nombre del Producto es: ", this.productoActual);
    //console.log("El Vendedor es: ", this._idProducto);

    this.CargarLaInformacionDelProducto(this._idProducto);


  }

  CargarLaInformacionDelProducto(producto: any){
    this.basededatos.obtenerProductoPorUuid(producto).subscribe((resp) => {
      /*resp.forEach((produc:any) =>{
        if(produc.uuid == producto){
          this.productoEncontrado.nombre = produc.nombre;
          this.productoEncontrado.descripcionCorta = produc.descripcionCorta;
          this.productoEncontrado.descripcionLarga = produc.descripcionLarga;
          this.productoEncontrado.categoria = produc.categoria;
          this.productoEncontrado.precio = produc.precio;
          this.productoEncontrado.cantidadDisponible = produc.cantidadDisponible;
          this.productoEncontrado.idVendedor = produc.idVendedor;
          this.productoEncontrado.uuid = produc.uuid;

          if(produc.imagenes.length > 0){
            this.imagenProductoPrincipal = produc.imagenes[0];
          }
        }
      })*/
        
      //this.todaslasimagenes = produc.imagenes;
        this.productoEncontrado = resp;
        
     
      //console.log("EL ###########: ",this.productoEncontrado);
    },(error) =>{
      this.basededatos.MensajeDeVerificacion("Error al cargar la Informacion del Producto");
      //console.error('Error al buscar productos en el componente', error);
    })

  }

  Actaulizarproducto(){
    //console.log('Actualizar Producto...');
    this.basededatos.actualizarProducto(this.productoEncontrado.uuid, this.productoEncontrado)
    .then((res) =>{
      this.basededatos.MensajeDeVerificacion("Se ha Guardado los datos correctamente.");
    }).catch(() =>{
      this.basededatos.MensajeDeVerificacion("Error al guardar la informacion.");
    })
  }

}
