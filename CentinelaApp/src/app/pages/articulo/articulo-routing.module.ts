import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticuloPage } from './articulo.page';

const routes: Routes = [
  {
    path: '',
    component: ArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticuloPageRoutingModule {}
