import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  register(id: any, body: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/restaurants/register',
      {
        titular_id: id,
        nombre: body.nombre,
        especialidad: body.especialidad,
        direccion: body.direccion,
        ciudad: body.ciudad,
      }
    );
  }
  getRestaurantsByTitular(id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/restaurants/restaurantsById',
      {
        id: id,
      }
    );
  }

  getCategorias() {
    return this.http.get(
      'https://api.combeneficios.co:7000/api/restaurants/categorias'
    );
  }

  addProduct(body: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/restaurants/add',
      body
    );
  }
}
