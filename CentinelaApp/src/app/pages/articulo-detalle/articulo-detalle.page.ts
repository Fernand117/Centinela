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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertController,
    private apiService: ServiceService
  ) {}

  id = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    this.cargarBadge();
  }

  addToCart(){
    if (Number(this.contador) == 0) {
      this.alertMsg("Ocurrió un error","Ingrese por favor una cantidad mayor a 0.");
    } else {
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

  cargarProductoDetalle(){
    this.formData.append('idProducto', this.id);
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
