import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Services/autenticacion.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {

  email: string = "";
  mipassword: string = "";
  loading: boolean = false;

  constructor(
    public router: Router,
    public autenticacion: AutenticacionService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  IniciarSesion(){
    this.autenticacion.SignIn(this.email, this.mipassword).then((resp) =>{
      //console.log("Inicio sesion el usuario: ",resp);
      this.router.navigate(['tiendaprincipal']);
      this.mensajeDeBienvenida();
    }).catch((error) =>{
      this.autenticacion.MensajeDeVerificacion("Verifica el Email o Contraseña");
      //console.log("ocurrio un error al registrar el usuario: ",error);  
    }).finally(() =>{
      
    })
  }

  mensajeDeBienvenida(){
    this.autenticacion.MensajeDeVerificacion("Bienvenido a Trocaderoshop.");
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      //duration: 3000,
    });

    loading.present();
  }

}
