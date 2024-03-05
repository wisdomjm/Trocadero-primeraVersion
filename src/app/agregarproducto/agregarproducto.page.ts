import { Component, OnInit } from '@angular/core';
import { CrudproductosService } from '../Services/crudproductos.service';
import { SubirmultimediaService } from '../Services/subirmultimedia.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Producto from 'src/Models/Producto';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {

  producto: Producto = {
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

  // Variable para almacenar la imagen seleccionada
  imagenSeleccionada!: File;
  archivosSeleccionados: File[] = [];
  imagenesDelProducto: any = [];
  imagenPrevia: any;

  currentUser: any;

  constructor(
    private baseproductos: CrudproductosService,
    private storage: AngularFireStorage,
    private subirmultiplesarchivos: SubirmultimediaService
  ) { 
    this.currentUser = localStorage.getItem('userID');
    console.log("La ID del usuario es: ",this.currentUser);
    this.producto.idVendedor = this.currentUser;
  }

  ngOnInit() {
    
    this.imagenPrevia = "../../assets/no-preview.png";
  }

  CrearNuevoproducto(){
    if(this.imagenesDelProducto.length == 0){
      this.baseproductos.MensajeDeVerificacion("Agregue unas Imagenes del Producto");
      //console.log("no se han cargado las imagenes..");
      return;
    }else{
      this.baseproductos.RegistrarNuevoProducto(this.producto).then((res) =>{
        this.baseproductos.MensajeDeVerificacion("Producto registrado correctamente");
        //console.log("Se guardo el Producto.. ",res);
      }).catch((err) =>{
        this.baseproductos.MensajeDeVerificacion("Se genero un error al guardar el Producto");
        //console.log("se genero un error al guardar..", err);
      })
    }
    
  }

  seleccionarArchivos(event: any) {
    this.archivosSeleccionados = event.target.files;
  }

  async subirArchivos() {
    if (this.archivosSeleccionados.length > 0) {
      this.imagenPrevia = "";
      const urls = await this.subirmultiplesarchivos.subirMultiplesImagenes(this.archivosSeleccionados, this.currentUser, this.producto.nombre);
      //console.log('URLs de descarga:', urls);
      this.imagenesDelProducto = urls;
      this.producto.imagenes = this.imagenesDelProducto;

      if(this.imagenesDelProducto.length > 0){
        this.imagenPrevia = this.imagenesDelProducto[0];
      }
    } else {
      this.baseproductos.MensajeDeVerificacion("No se seleccionaron las imagenes del Producto.");
      //console.log('No se seleccionaron archivos.');
    }
  }

  


}
