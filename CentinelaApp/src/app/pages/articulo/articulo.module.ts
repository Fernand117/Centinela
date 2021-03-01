import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticuloPageRoutingModule } from './articulo-routing.module';

import { ArticuloPage } from './articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticuloPageRoutingModule
  ],
  declarations: [ArticuloPage]
})
export class ArticuloPageModule {}
