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
  email: string;
  password: string;
  statusChekBox: boolean;

  constructor(){
    this.email = "";
    this.password = "";
    this.statusChekBox = false;
  }
}
