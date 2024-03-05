import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirmultimediaService {

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  // Subir imagen al Storage y actualizar el campo de imagen en la base de datos
  subirImagenYActualizarProducto(nombreProducto: string, imagen: File){
    const userId = this.auth.currentUser;

    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    // Ruta en el Storage donde se almacenará la imagen (puedes ajustarla según tus necesidades)
    const filePath = `Productos/${userId}/${nombreProducto}_${new Date().getTime()}_${imagen.name}`;

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imagen);

    uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        const downloadURL = await storageRef.getDownloadURL().toPromise();

        // Actualizar el campo de imagen en la base de datos con la URL de la imagen
        //this.firestore.collection('Productos').doc(idProducto).update({ imagen: downloadURL });

        return downloadURL;
      })
    );
  }

  subirMultiplesImagenes(files: File[], userIdentification: any, nombreProducto: any): Promise<string[]> {
    const filesArray = Array.from(files);

    const uploadTasks = filesArray.map(file => {
      const filePath = `carpeta-imagenes/${userIdentification}/${nombreProducto}/${file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await storageRef.getDownloadURL().toPromise();
            resolve(downloadURL);
          })
        ).subscribe();
      });
    });

    return Promise.all(uploadTasks);
  }



}
