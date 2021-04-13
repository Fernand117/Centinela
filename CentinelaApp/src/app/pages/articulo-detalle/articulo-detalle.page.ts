import { Component, OnInit } from '@angular/core';
import { CarritoModule } from './../../models/carrito/carrito.module';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.page.html',
  styleUrls: ['./articulo-detalle.page.scss'],
})
export class ArticuloDetallePage implements OnInit {

  carrito: CarritoModule = new CarritoModule();
  formData: FormData = new FormData();
  producto: any;
  carritoC: JSON;
  car: any;
  contador = 0;
  cont = 0;
  cliente: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertController,
    private apiService: ServiceService
  ) {}

  id = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    this.cargarBadge();
    this.cargarProductoDetalle();
  }

  addToCart(items){
    this.cliente = JSON.parse(localStorage.getItem('Usuario'));
    console.log(this.cliente[0]['nombre']);
    this.cont = this.contador * items.precio;
    console.log(this.cont);
    this.formData.append('cliente', this.cliente[0]['nombre']);
    this.formData.append('idProducto', items.id);
    this.formData.append('cantidad', this.contador.toString());
    this.formData.append('subtotal', this.cont.toString());
    this.apiService.añadirDetallePedido(this.formData).subscribe(
      respuesta => {
        console.log(respuesta['Mensaje']);
        this.alertMsg('Advertencia', respuesta['Mensaje']);
      }
    );
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

  cargarProductoDetalle(){
    this.formData.append('idProductos', this.id);
    this.apiService.listaProductoDetalle(this.formData).subscribe(
      respuesta => {
        this.producto = respuesta['Producto'];
      }, error => {
        if (error['status'] == 404) {
          document.getElementById("producto").innerHTML = '<div class="msjError" style="margin-top:50%; padding: 16px; text-align: center; font-size: 18px; color: #263238;">' + error['error']['Producto'] + '</div>';
        } else {
          document.getElementById("producto").innerHTML = '<div class="msjError" style="margin-top:50%; padding: 16px; text-align: center; font-size: 18px; color: #263238;"> No hay conexión con el servidor </div>';
        }
      }
    );
  }
}
