import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { empty } from 'rxjs';
import { strict } from 'assert';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule {
  nombre: string;
  paterno: string;
  materno: string;
  edad: string;
  calle: string;
  colonia: string;
  ciudad: string;
  estado: string;
  usuario: string;
  email: string;
  password: string;
  fotoPerfil: Object;
  statusChekBox: boolean;

  constructor(){
    this.nombre = "";
    this.paterno = "";
    this.materno = "";
    this.edad = "";
    this.calle = "";
    this.colonia = "";
    this.ciudad = "";
    this.estado = "";
    this.usuario = "";
    this.email = "";
    this.password = "";
    this.statusChekBox = false;
  }
}
