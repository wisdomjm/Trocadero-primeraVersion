import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../Services/autenticacion.service';

@Component({
  selector: 'app-perfildeusuario',
  templateUrl: './perfildeusuario.page.html',
  styleUrls: ['./perfildeusuario.page.scss'],
})
export class PerfildeusuarioPage implements OnInit {

  useremail: any;
  datosUsuario: any = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: '',
    nombres: '',
    apellidos:'',
    direccion:'',
    telefono:'',
    pais:'',
    tienda:''
  }

  constructor(
    public autenticacion: AutenticacionService
  ) { }

  ngOnInit() {
    this.useremail = localStorage.getItem("emailUser");
    this.CargarInformacionDelUsuario();
  }

  CargarInformacionDelUsuario(){
    this.autenticacion.GetUserData(this.useremail).subscribe((res) =>{
      console.log(">>>>>>>>> ",res);
      res.forEach(usuario =>{
        if(usuario.email == this.useremail){
          this.datosUsuario.uid = usuario.uid;
          this.datosUsuario.email = usuario.email;
          this.datosUsuario.displayName = usuario.displayName;
          this.datosUsuario.photoURL = usuario.photoURL;
          this.datosUsuario.emailVerified = usuario.emailVerified;
          this.datosUsuario.nombres = usuario.nombres;
          this.datosUsuario.apellidos = usuario.apellidos;
          this.datosUsuario.direccion = usuario.direccion;
          this.datosUsuario.telefono = usuario.telefono;
          this.datosUsuario.pais = usuario.pais;
          this.datosUsuario.tienda = usuario.tienda;
        }
      })

    }),(error:any) => {

    }
  }


}
