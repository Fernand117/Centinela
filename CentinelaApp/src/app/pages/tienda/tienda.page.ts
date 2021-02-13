import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  cont = 0;

  constructor(
    private router: Router
  ) {
    this.obtenerBadge();
  }

  ngOnInit() {
    this.obtenerBadge();
  }

  obtenerBadge(){
    this.cont = Number(localStorage.getItem("cantidad"));
  }

  navCar(){
    this.router.navigateByUrl("carrito");
  }

}
