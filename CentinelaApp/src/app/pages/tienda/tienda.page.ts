import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  cont = 0;
  categorias: any;

  constructor(
    private router: Router,
    private apiService: ServiceService
  ) {
    this.obtenerBadge();
  }

  ngOnInit() {
    this.obtenerBadge();
    this.obtenerProductos();
  }

  obtenerBadge(){
    this.cont = Number(localStorage.getItem("cantidad"));
  }

  navCar(){
    this.router.navigateByUrl("carrito");
  }

  obtenerProductos(){
    this.apiService.listaCategorias().subscribe(
      respuesta => {
        this.categorias = respuesta['Categorias'];
      }, error => {
        if (error['status'] == 404) {
          document.getElementById("items").innerHTML = '<div class="msjError" style="margin-top:50%; padding: 16px; text-align: center; font-size: 18px; color: #263238;">' + error['error']['Categorias'] + '</div>';
        }
      }
    );
  }

}
