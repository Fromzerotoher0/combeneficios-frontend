import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RequestComponent } from './pages/request/request.component';
import { AddProductComponent } from './pages/add-product/add-product.component';


@NgModule({
  declarations: [RequestComponent, AddProductComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class RestaurantsModule { }
