import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticuloDetallePageRoutingModule } from './articulo-detalle-routing.module';

import { ArticuloDetallePage } from './articulo-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticuloDetallePageRoutingModule
  ],
  declarations: [ArticuloDetallePage]
})
export class ArticuloDetallePageModule {}
