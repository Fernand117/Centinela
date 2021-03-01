import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = 'http://192.168.1.69/centinelaApi/api';

  constructor(
    private http: HttpClient
  ) { }

  getMenu(){
    return this.http.get<Component[]>('../assets/menu.json');
  }

  login(datos: any){
    return this.http.post(`${this.url}/login/cliente`, datos);
  }

  listaGeneralSensores(){
    return this.http.get(`${this.url}/lista/general-sensores`);
  }

  listaProductos(datos: any){
    return this.http.post(`${this.url}/lista/productos-categorias`, datos);
  }

  listaCategorias(){
    return this.http.get(`${this.url}/lista/categorias`);
  }
}
