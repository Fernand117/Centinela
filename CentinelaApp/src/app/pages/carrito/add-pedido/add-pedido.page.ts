import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.page.html',
  styleUrls: ['./add-pedido.page.scss'],
})
export class AddPedidoPage implements OnInit {

  formData: FormData = new FormData();
  detallesPedidos: any;
  total: any;

  constructor(
    private payPal: PayPal,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ServiceService
  ) { }

  ngOnInit() {
    this.cargarDetallesPedidos();
  }

  id = this.route.snapshot.paramMap.get('id');

  cargarDetallesPedidos(){
    this.formData.append('idPedido', this.id);
    this.apiService.detallesPedido(this.formData).subscribe(
      respuesta => {
        document.getElementById("mensaje").innerHTML = '';
        this.detallesPedidos = respuesta['Detalles'];
      }, error => {
        if (error['status'] == 404){
          const mensaje  = error['error']['Detalles'];
          document.getElementById("mensaje").innerHTML = '<div class="msjError" style="padding: 16px; text-align: center; font-size: 18px; color: #263238;">' + mensaje + '</div>';
          document.getElementById("itemDetalles").innerHTML = '';
        } else {
          document.getElementById("mensaje").innerHTML = '<div class="msjError" style="padding: 16px; text-align: center; font-size: 18px; color: #263238;"> No hay conexión con el servidor </div>';
          document.getElementById("itemDetalles").innerHTML = '';
        }
      }
    );
  }

  realizarPagoPyPal(){
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AaEjinP_KeYQKrfu-eJu2LHAL_wB_WaXFVAS_pFmAbgdqoX1x8TvqpjatSWZ4SEhCrjzOMbUrSMfXr48'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'MXN', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          console.log(payment);
        }, (error) => {
          console.log(error);
        });
      }, (erroConfig) => {
        console.log(erroConfig);
      });
    }, (errorSupport) => {
      console.log(errorSupport);
    });
  }
}
