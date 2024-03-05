import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  // Importa desde '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Asegúrate de importar AngularFireAuth desde '@angular/fire/compat/auth'
import { Observable } from 'rxjs';

import { ToastController } from '@ionic/angular';
import Producto from 'src/Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CrudproductosService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastController: ToastController,
  ) { }

  //Registrar nuevo Producto
  RegistrarNuevoProducto(data: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('Productos').add(data)
            .then(() => {
              console.log('Producto registrado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }


  //CARRITO DE COMPRAS
  RegistrarProductosEnCarritoDeCompra(data: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('productosEnCarritoDeCompra').add(data)
            .then(() => {
              console.log('Producto registrado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }

  //BUSCAR LOS PRODUCTOS EN EL CARRITO POR idvendedor
  buscarProductosEnCarritoDeCompras(idVendedor: string): Observable<any[]> {
    return this.firestore.collection('productosEnCarritoDeCompra', ref => ref.where('idVendedor', '==', idVendedor)).valueChanges();
  }

  //CARRITO DE COMPRAS
  RegistrarProductosEnHistorialDeCompra(data: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('productosEnHistorialDeCompra').add(data)
            .then(() => {
              console.log('Producto registrado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }
  
  //BUSCAR LOS PRODUCTOS EN EL Historial POR idvendedor
  buscarProductosEnHistorialDeCompras(idVendedor: string): Observable<any[]> {
    return this.firestore.collection('productosEnHistorialDeCompra', ref => ref.where('idVendedor', '==', idVendedor)).valueChanges();
  }

  //REGISTRAR PREGUNTAS DE UN PRODUCTO
  RegistrarUnaPreguntaEnUnProducto(pregunta: any):Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('PreguntasTrocadero').add(pregunta)
            .then(() => {
              console.log('Pregunta registrada correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar la Pregunta', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }

  //CARGAR LAS PREGUNTAS DEL PRODUCTO
  cargarPreguntasPorIdProducto(idProducto: any): Observable<any[]> {
    return this.firestore.collection('PreguntasTrocadero', ref => ref.where('idProducto', '>=', idProducto)).valueChanges();
  }

  //Obtener la lista de Todos los Productos dentro de la Coleccion Productos
  obtenerTodosLosProductos(): Observable<any[]> {
    return this.firestore.collection('Productos').valueChanges();
  }

  //BUSCAR LOS PRODUCTOS POR NOMBRE
  buscarProductosPorNombre(nombre: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('nombre', '>=', nombre).where('nombre', '<=', nombre + '\uf8ff')).valueChanges();
  }

  //FILTRAR UN PRODUCTO POR UNA CATEGORIA
  buscarProductosPorCategoria(categoria: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  //FILTRAR UN PRODUCTO POR EL ID DEL VENDEDOR
  buscarProductosPorIdDelVendedor(idVendedor: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('idVendedor', '==', idVendedor)).valueChanges();
  }

  // Actualizar un producto específico
  actualizarProducto(idProducto: string, nuevoData: any): Promise<void> {
    return this.firestore.collection('Productos').doc(idProducto).update(nuevoData);
  }
   
  async MensajeDeVerificacion(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
    });

    await toast.present();
  }
}
