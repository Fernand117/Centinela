import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito: any;
  carritoC: any;
  total: number;

  constructor() {}

  ngOnInit() {
    this.carritoC = JSON.parse(localStorage.getItem('carrito'));
    console.log(this.carritoC);
  }

}
