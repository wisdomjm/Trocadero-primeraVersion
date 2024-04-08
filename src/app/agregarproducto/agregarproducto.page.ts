import { Component, OnInit } from '@angular/core';
import { CrudproductosService } from '../Services/crudproductos.service';
import { SubirmultimediaService } from '../Services/subirmultimedia.service';
import Producto from 'src/Models/Producto';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {

  emailUsuario: any;
  producto: Producto = {
    uuid:'',
    nombre:'',
    descripcionCorta:'',
    descripcionLarga:'',
    categoria:'',
    precio:0,
    cantidadDisponible:0,
    idVendedor:'',
    emailVendedor:'',
    fechaCreacion:'',
    imagenes:{},
    video:''
  };

  // Variable para almacenar la imagen seleccionada
  imagenSeleccionada!: File;
  archivosSeleccionados: File[] = [];
  imagenesDelProducto: any = [];
  imagenPrevia: any;

  videoSeleccionado: File[] = [];
  videoDelProducto: any;
  videoPrevio: any;

  currentUser: any;

  constructor(
    private baseproductos: CrudproductosService,
    private subirmultiplesarchivos: SubirmultimediaService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { 
    this.currentUser = localStorage.getItem('userID');
    this.emailUsuario = localStorage.getItem('useremail');
    //console.log("La ID del usuario es: ",this.currentUser);
    this.producto.idVendedor = this.currentUser;
  }

  ngOnInit() {
    
    this.imagenPrevia = "../../assets/no-preview.png";
  }

  CrearNuevoproducto(){
    this.producto.uuid = this.generarUID();
    this.producto.emailVendedor = this.emailUsuario;
    if(this.imagenesDelProducto.length == 0){
      this.baseproductos.MensajeDeVerificacion("Agregue unas Imagenes del Producto");
      //console.log("no se han cargado las imagenes..");
      return;
    }else{

      if(
        this.producto.nombre == '' ||
        this.producto.descripcionCorta == '' ||
        this.producto.descripcionLarga == '' ||
        this.producto.categoria == '' 
        
      ){
        //mostrar mensaje de error
        this.baseproductos.MensajeDeVerificacion("Algunos campos estan vacio, verifique la informacion");
      }else{
        //guardar
        this.MostrarLoading();
        this.baseproductos.RegistrarNuevoProducto(this.producto.uuid, this.producto).then((res) =>{
          this.baseproductos.MensajeDeVerificacion("Producto registrado correctamente");
          //console.log("Se guardo el Producto.. ",res);
        }).catch((err) =>{
          this.baseproductos.MensajeDeVerificacion("Se genero un error al guardar el Producto");
          //console.log("se genero un error al guardar..", err);
        }).finally(() =>{
          this.limpiarCampos();
          this.loadingCtrl.dismiss();
        })
      }

     
    }
    
  }

  seleccionarArchivos(event: any) {
    this.archivosSeleccionados = event.target.files;
    
    if (!this.archivosSeleccionados) {
      //console.error("No se proporcionó ningún archivo.");
      this.MensajeDeVerificacion("No se selecciono ninguna imagen.");
      return;
    }
  }

  async subirArchivos() {
    if (this.archivosSeleccionados.length > 0) {
      this.imagenPrevia = "";
      this.MostrarLoading();
      const urls = await this.subirmultiplesarchivos.subirMultiplesImagenes(this.archivosSeleccionados, this.currentUser, this.producto.nombre);
      //console.log('URLs de descarga:', urls);
      this.imagenesDelProducto = urls;
      this.producto.imagenes = this.imagenesDelProducto;

      if(this.imagenesDelProducto.length > 0){
        this.imagenPrevia = this.imagenesDelProducto[0];
        this.loadingCtrl.dismiss();
      }
    } else {
      this.baseproductos.MensajeDeVerificacion("No se seleccionaron las imagenes del Producto.");
      this.loadingCtrl.dismiss();
      //console.log('No se seleccionaron archivos.');
    }
  }

  async MensajeDeVerificacion(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
  
  limpiarCampos(){
   
    this.producto.nombre = '';
    this.producto.descripcionCorta= '';
    this.producto.descripcionLarga= '';
    this.producto.categoria= '';
    this.producto.precio = 0;
    this.producto.cantidadDisponible=0;
    this.producto.idVendedor= '';
    this.producto.fechaCreacion= '';
    this.producto.imagenes = {};
   
  }

  seleccionarVideo(event: any) {
    this.videoSeleccionado = event.target.files;
    
    if (!this.videoSeleccionado) {
      this.MensajeDeVerificacion("No se selecciono ninguna imagen.");
      return;
    }
  }


  async subirVideo() {
    if (this.videoSeleccionado.length > 0) {
      this.videoPrevio = "";
      this.MostrarLoading();
      const urls = await this.subirmultiplesarchivos.subirMultiplesVideo(this.videoSeleccionado, this.currentUser, this.producto.nombre)
        .then(res =>{
          console.log('URLs de descarga:', res);
          this.videoDelProducto = res;
          this.producto.video = this.videoDelProducto;
          this.videoPrevio = this.videoDelProducto;
        }, err => {
          this.baseproductos.MensajeDeVerificacion("Error al enviar el video del Producto.");
        }).finally( () =>{
          this.loadingCtrl.dismiss();
        })

    } else {
      this.baseproductos.MensajeDeVerificacion("No se seleccionaron el video del Producto.");
      //this.loadingCtrl.dismiss();
      //console.log('No se seleccionaron archivos.');
    }
  }

  generarUID(): string {
    return uuidv4();
  }

  async MostrarLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: 'custom-loading',
      spinner: 'bubbles' 

    });

    loading.present();
  }

}
