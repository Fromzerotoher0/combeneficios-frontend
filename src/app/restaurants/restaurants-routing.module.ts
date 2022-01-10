import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { RequestComponent } from './pages/request/request.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'solicitud',
        component: RequestComponent,
      },
      {
        path: 'agregar',
        component: AddProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsRoutingModule {}
