import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.page.html',
  styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {

  formData: FormData = new FormData();
  productosLista: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ServiceService
  ) { }

  id = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(){
    this.formData.append('idCategoria', this.id);
    this.apiService.listaProductos(this.formData).subscribe(
      respuesta => {
        this.productosLista = respuesta['Productos'];
      }, error => {
        if (error['status'] == 404) {
          document.getElementById("productos").innerHTML = '<div class="msjError" style="margin-top:50%; padding: 16px; text-align: center; font-size: 18px; color: #263238;">' + error['error']['Productos'] + '</div>';
        } else {
          document.getElementById("productos").innerHTML = '<div class="msjError" style="margin-top:50%; padding: 16px; text-align: center; font-size: 18px; color: #263238;"> No hay conexión con el servidor </div>';
        }
      }
    );
  }

}
