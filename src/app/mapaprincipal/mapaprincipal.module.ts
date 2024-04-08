import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaprincipalPageRoutingModule } from './mapaprincipal-routing.module';

import { MapaprincipalPage } from './mapaprincipal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaprincipalPageRoutingModule
  ],
  declarations: [MapaprincipalPage]
})
export class MapaprincipalPageModule {}
