import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleproductoPageRoutingModule } from './detalleproducto-routing.module';

import { DetalleproductoPage } from './detalleproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleproductoPageRoutingModule
  ],
  declarations: [DetalleproductoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalleproductoPageModule {}
