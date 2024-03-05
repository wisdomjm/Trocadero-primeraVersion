import { Component, OnInit } from '@angular/core';
import { CrudproductosService } from '../Services/crudproductos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  productosEnHistorial: any = [];
  idvendedor: any;

  constructor(
    private basedatos: CrudproductosService
  ) { }

  ngOnInit() {
  }

  async cargarProductosDelCarrito(){
    this.productosEnHistorial = [];

    await this.basedatos.buscarProductosEnHistorialDeCompras(this.idvendedor).subscribe(
      (productos) => {
        this.productosEnHistorial = productos;
      },
      (error) => {
        this.basedatos.MensajeDeVerificacion("Error al cargar los productos");
      }
    );
  }

}
