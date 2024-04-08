import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { loadScript } from "@paypal/paypal-js";

@Component({
  selector: 'app-paginadepago',
  templateUrl: './paginadepago.page.html',
  styleUrls: ['./paginadepago.page.scss'],
})
export class PaginadepagoPage implements OnInit {

  //PAYPAL
  PAYPAL_CLIENT_ID: string = 'AZmjqPRafsfOWIOz_aX9-zyI44cLir1zgxxM2QQO1O9DHDSs7CHIZtD38IfW4YHU8-hKKSfHwzHgUZ2w';
  //@ViewChild('paypalRef', { static: true }) private paypalRef?: ElementRef;
  productoActual: any = {
    nombre:'',
    descripcionCorta:'',
    precio:0,
    cantidadDisponible:0,
    idVendedor:'',
    imagenes:'' 
  };

  constructor(
    public rutaActual: ActivatedRoute,
  ) { 
    this.productoActual.nombre = this.rutaActual.snapshot.paramMap.get('nombreProducto');
    this.productoActual.idVendedor = this.rutaActual.snapshot.paramMap.get('idVendedor');
    this.productoActual.precio = this.rutaActual.snapshot.paramMap.get('precio');
    this.productoActual.cantidadDisponible = this.rutaActual.snapshot.paramMap.get('cantidad');
    this.productoActual.descripcionCorta = this.rutaActual.snapshot.paramMap.get('descripcion');
    this.productoActual.imagenes = this.rutaActual.snapshot.paramMap.get('imagen');
  }

  ngOnInit() {
    var descripcion = "";
    var valor = 0;
    descripcion = this.productoActual.descripcionCorta;
    valor = this.productoActual.precio;
    //paypal.Buttons.driver("angular", window.angular);
    loadScript(
      { 
        clientId: "AZmjqPRafsfOWIOz_aX9-zyI44cLir1zgxxM2QQO1O9DHDSs7CHIZtD38IfW4YHU8-hKKSfHwzHgUZ2w",
        currency: "USD" 
      }).then((paypal:any) => {
          
          paypal.Buttons({
              createOrder: function(data: any, actions: any) {
                return actions.order.create({
                    purchase_units: [{
                        "description": descripcion, //descripcion del producto
                        "amount": {
                            "currency_code": "USD",
                            "value": valor //valor del producto
                        }
                    }]
                });
            },
            onApprove: function(data: any, actions: any) {
                return actions.order.capture().then(function(orderData: any) {
                    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                    const element = document.getElementById('#paypal-buttons');
                    //element.innerHTML = '';
                    //element.innerHTML = '<h3>Thank you for your payment!</h3>';
                });
            },
            onError: function(err: any) {
                console.log(err);
            },
            style: {
              layout: 'vertical',
              color:  'blue',
              shape:  'rect',
              label:  'paypal'
            }
          }).render("#paypal-buttons").catch((error: any) => {
          console.error("failed to render the PayPal Buttons", error);
        });
      })
      .catch((error) => {
        console.error("failed to load the PayPal JS SDK script", error);
      });

  }




}
