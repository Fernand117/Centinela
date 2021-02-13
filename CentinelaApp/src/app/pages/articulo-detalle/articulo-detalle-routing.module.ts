import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticuloDetallePage } from './articulo-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ArticuloDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticuloDetallePageRoutingModule {}
