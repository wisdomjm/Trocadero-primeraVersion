import { Component, OnInit } from '@angular/core';
import { CrudproductosService } from '../Services/crudproductos.service';

@Component({
  selector: 'app-tiendaprincipal',
  templateUrl: './tiendaprincipal.page.html',
  styleUrls: ['./tiendaprincipal.page.scss'],
})
export class TiendaprincipalPage implements OnInit {

  categorias: any = [];
  todosLosProductos: any[] = [];

  constructor(
    private baseproductos: CrudproductosService
  ) { }

  ngOnInit() {
    this.CargarCategorias();
    this.MostrarTodosLosProductosDisponibles();
  }

  public CargarCategorias(){
    this.categorias = [
      {nombre:'Todos'},
      {nombre:'Diversion y Recreacion'},
      {nombre:'Regalos'},
      {nombre:'Servicios Educativos'},
      {nombre:'Agro'},
      {nombre:'Alimentos y Bebidas'},
      {nombre:'Animales y Mascotas'},
      {nombre:'Antiguedades y Colecciones'},
      {nombre:'Arte y Papeleria'},
      {nombre:'Bebes'},
      {nombre:'Belleza y Cuidado Personal'},
      {nombre:'Consolas y Videojuegos'},
      {nombre:'Deportes y Fitness'},
      {nombre:'Instrumentos Musicales'},
      {nombre:'Juegos y Juguetes'},
      {nombre:'Libros, Revistas y Comics'},
      {nombre:'Ropa y Accesorios'},
      {nombre:'Salud y Equipamento Medico'},

    ]
  }


  public MostrarTodosLosProductosDisponibles(){
    this.todosLosProductos = [];
    this.baseproductos.obtenerTodosLosProductos().subscribe(
      (productos) => {
        this.todosLosProductos = productos;
        //console.log("PRODUCTOS>>>> ",this.todosLosProductos);
      },
      (error) => {
        this.baseproductos.MensajeDeVerificacion("Error al cargar los productos");
        //console.error('Error al obtener todos los productos en el componente', error);
        // Manejar el error según sea necesario
      }
    );
  }


  public FiltrarPorCategoria(_categoria: any){
   
    this.todosLosProductos = [];

    if(_categoria == "Todos"){
      this.MostrarTodosLosProductosDisponibles();
    }else{
      this.baseproductos.buscarProductosPorCategoria(_categoria).subscribe(
        (productos) => {
          this.todosLosProductos = productos;
          //console.log("PRODUCTOS POR CATEGORIA>>>> ",this.todosLosProductos);
        },
        (error) => {
          this.baseproductos.MensajeDeVerificacion("Error al cargar los productos");
          //console.error('Error al buscar productos por categoría en el componente', error);
          // Manejar el error según sea necesario
        }
      );
    }
    
  }


}
