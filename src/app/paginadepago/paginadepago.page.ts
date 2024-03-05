import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
 

  constructor() { }

  ngOnInit() {

    //paypal.Buttons.driver("angular", window.angular);
    loadScript(
      { 
        clientId: "AZmjqPRafsfOWIOz_aX9-zyI44cLir1zgxxM2QQO1O9DHDSs7CHIZtD38IfW4YHU8-hKKSfHwzHgUZ2w",
        currency: "EUR" 
      }).then((paypal:any) => {
          paypal.Buttons({
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
