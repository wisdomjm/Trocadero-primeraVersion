import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
//import { getAuth, provideAuth } from '@angular/fire/auth';
//import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//import { getDatabase, provideDatabase } from '@angular/fire/database';
//import { getFunctions, provideFunctions } from '@angular/fire/functions';
//import { getMessaging, provideMessaging } from '@angular/fire/messaging';  

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

//Integracion de Paypal
//import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule, IonicModule.forRoot(),   
    AppRoutingModule,
    //NgxPayPalModule,
    //provideFirebaseApp(() => initializeApp({"projectId":"trocadero-c0449","appId":"1:496141058160:web:f7837139f3c88f1bd5b4b5","databaseURL":"https://trocadero-c0449-default-rtdb.firebaseio.com","storageBucket":"trocadero-c0449.appspot.com","apiKey":"AIzaSyAgQR6H9WJk6Xle0BToTTug78a8sKjRTIc","authDomain":"trocadero-c0449.firebaseapp.com","messagingSenderId":"496141058160","measurementId":"G-975QZGWQJB"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
