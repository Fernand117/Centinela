import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  cliente: any;
  datosCliente: any;
  datosPedidos: any;
  formData: FormData = new FormData();

  constructor(
    private apiService: ServiceService,
    private alertController: AlertController,
    private loadController: LoadingController
  ) {}

  ngOnInit() {
    this.obtenerDatosCliente();
    this.obtenerListaPedidos();
  }

  async alertMsg(sheader, mensaje){
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader:  sheader,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  obtenerDatosCliente(){
    this.datosCliente = JSON.parse(localStorage.getItem('Usuario'));
    this.cliente = this.datosCliente[0]['nombre'];
  }

  obtenerListaPedidos(){
    this.obtenerDatosCliente();
    this.formData.append('cliente', this.cliente);
    this.apiService.listaPedidos(this.formData).subscribe(
      respuesta => {
        document.getElementById("cardPedidos").innerHTML = '';
        this.datosPedidos = respuesta['Pedidos'];
      }, error => {
        const mensaje  = error['error']['Pedidos'];
        if (error['status'] == 404){
          document.getElementById("cardPedidos").innerHTML = '<div class="msjError" style="padding: 16px; text-align: center; font-size: 18px; color: #263238;">' + mensaje + '</div>';
          document.getElementById("cardItemPedidos").innerHTML = '';
        } else {
          document.getElementById("cardPedidos").innerHTML = '<div class="msjError" style="padding: 16px; text-align: center; font-size: 18px; color: #263238;"> No hay conexión con el servidor </div>';
          document.getElementById("cardItemPedidos").innerHTML = '';
        }
      }
    );
  }

  async crearPedido(){
    const load = await this.loadController.create({
      cssClass: "my-custom-class",
      message: "Levantando pedido.",
      duration: 200
    });
    await load.present();
    this.obtenerDatosCliente();
    this.formData.append('cliente', this.cliente);
    this.formData.append('venta', 'No');
    this.formData.append('total', '0');
    this.apiService.crearPedido(this.formData).subscribe(
      respuesta => {
        this.alertMsg('Advertencia', respuesta['Mensaje']);
        this.obtenerListaPedidos();
      }, error => {
        this.alertMsg('Error', error);
      }
    );
    load.onDidDismiss();
  }

  async eliminarPedido(numero_pedido){
    const load = await this.loadController.create({
      cssClass: "my-custom-class",
      message: "Eliminando pedido.",
      duration: 2000
    });
    await load.present();
    this.formData.append('numero_pedido', numero_pedido);
    this.apiService.eliminarPedido(this.formData).subscribe(
      respuesta => {
        this.alertMsg('Advertencia', respuesta['Mensaje']);
        this.obtenerListaPedidos();
      }, error => {
        console.log(error);
        this.alertMsg('Error', error['error']['Mensaje']);
      }
    );
    load.onDidDismiss();
  }
}
