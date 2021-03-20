import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoPage } from './carrito.page';

const routes: Routes = [
  {
    path: '',
    component: CarritoPage
  },
  {
    path: 'add-pedido',
    loadChildren: () => import('./add-pedido/add-pedido.module').then( m => m.AddPedidoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritoPageRoutingModule {}
