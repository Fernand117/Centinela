import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CarritoModule {
  id: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;

  constructor() {
    this.id = 0;
    this.nombre = "";
    this.cantidad = 0;
    this.precio_unitario = 0;
    this.precio_total = 0;
  }
}
