import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  //private url = 'http://192.168.1.69/centinelaApi/api';
  private url = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  getMenu(){
    return this.http.get<Component[]>('../assets/menu.json');
  }

  login(datos: any){
    return this.http.post(`${this.url}/login/cliente`, datos);
  }

  registrarCuenta(datos: any){
    return this.http.post(`${this.url}/crear/cliente`, datos);
  }

  listaGeneralSensores(){
    return this.http.get(`${this.url}/lista/general-sensores`);
  }

  listaProductos(datos: any){
    return this.http.post(`${this.url}/lista/productos-categorias`, datos);
  }

  listaProductoDetalle(datos: any){
    return this.http.post(`${this.url}/lista/producto-detalle`, datos);
  }

  listaCategorias(){
    return this.http.get(`${this.url}/lista/categorias`);
  }
}
