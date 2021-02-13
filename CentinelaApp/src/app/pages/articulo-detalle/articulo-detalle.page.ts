import { Component, OnInit } from '@angular/core';
import { CarritoModule } from './../../models/carrito/carrito.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.page.html',
  styleUrls: ['./articulo-detalle.page.scss'],
})
export class ArticuloDetallePage implements OnInit {

  carrito: CarritoModule = new CarritoModule();
  contador = 0;
  cont = 0;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarBadge();
  }

  addToCart(){
    this.cont = Number(this.cont) + Number(this.contador);
    localStorage.setItem("cantidad", String(this.cont));
    console.log(this.cont);
    this.carrito.id = 2;
    this.carrito.nombre = "Sensor SHbA";
    this.carrito.precio_unitario = 85.00;
    this.carrito.cantidad = this.cont;
    this.carrito.precio_total = Number(this.carrito.precio_unitario) * Number(this.carrito.cantidad);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.cargarBadge();
  }

  cargarBadge(){
    this.cont = Number(localStorage.getItem("cantidad"));
  }

  navCar(){
    this.router.navigateByUrl("carrito");
  }

}
