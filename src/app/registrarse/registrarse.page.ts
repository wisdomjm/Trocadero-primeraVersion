import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Services/autenticacion.service';
import { CrudproductosService } from '../Services/crudproductos.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    public router: Router,
    public autenticacion: AutenticacionService,
    private baseproductos: CrudproductosService
  ) { }

  ngOnInit() {
  }
  //routerLink="/continuarregistro"

  async RegistrarUsuario(){
    await this.autenticacion.SignUp(this.email, this.password).then((resp) =>{
      //console.log("Se registro el usuario: ",resp);
      this.router.navigate(['iniciarsesion']);
    }).catch((error) =>{
      this.baseproductos.MensajeDeVerificacion("Ocurrio un error al registrar el usuario, verifica tus datos");
      //console.log("ocurrio un error al registrar el usuario: ",error);  
    })
  }
}
