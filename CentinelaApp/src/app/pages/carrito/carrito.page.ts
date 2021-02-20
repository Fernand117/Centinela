import { Component, OnInit } from '@angular/core';
import { CarritoModule } from '../../models/carrito/carrito.module';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito: CarritoModule = new CarritoModule();
  carritoC: any;
  total: number;

  constructor() {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(){
    this.carritoC = JSON.parse(localStorage.getItem('carrito'));
    console.log(this.carritoC);
    if (this.carritoC === null){
      this.carrito.id = 0;
      this.carrito.nombre = "N";
      this.carrito.precio_unitario = 0;
      this.carrito.cantidad = 0;
      this.carrito.precio_total = 0;
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.carritoC = JSON.parse(localStorage.getItem('carrito'));
    }
    this.total = this.carritoC.precio_total;
    console.log(this.carritoC);
    console.log(this.total);
  }

}
