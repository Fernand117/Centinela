import { Component, OnInit } from '@angular/core';
import { CarritoModule } from './../../models/carrito/carrito.module';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.page.html',
  styleUrls: ['./articulo-detalle.page.scss'],
})
export class ArticuloDetallePage implements OnInit {

  carrito: CarritoModule = new CarritoModule();
  carritoC: JSON;
  car: any;
  contador = 0;
  cont = 0;

  constructor(
    private router: Router,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.cargarBadge();
  }

  addToCart(){
    if (Number(this.contador) == 0) {
      this.alertMsg("Ocurrió un error","Ingrese por favor una cantidad mayor a 0.");
    } else {
      this.carritoC = JSON.parse(localStorage.getItem('carrito'));
      this.cont = Number(this.cont) + Number(this.contador);
      localStorage.setItem("cantidad", String(this.cont));
      console.log(this.cont);
      this.carrito.id = 2;
      this.carrito.nombre = "Sensor SHbA";
      this.carrito.precio_unitario = 85.00;
      this.carrito.cantidad = this.cont;
      this.carrito.precio_total = Number(this.carrito.precio_unitario) * Number(this.carrito.cantidad);
      this.car = JSON.stringify(this.carritoC) + JSON.stringify(this.carrito);
      console.log("Carrito: " + JSON.stringify(this.car));
      localStorage.setItem('carrito', JSON.stringify(this.car));
      this.cargarBadge();
    }
  }

  async alertMsg(sheader, mensaje){
    const alert = await this.alert.create({
      header: 'Alerta',
      subHeader: sheader,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  cargarBadge(){
    this.cont = Number(localStorage.getItem("cantidad"));
  }

  navCar(){
    this.router.navigateByUrl("carrito");
  }

}
