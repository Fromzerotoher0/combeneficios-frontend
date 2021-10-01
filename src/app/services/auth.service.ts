import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getDepartamentos() {
    return this.http.get(
      'https://combeneficios.herokuapp.com/api/departamentos'
    );
  }

  cargarCiudades(departamento: any) {
    return this.http.post('https://combeneficios.herokuapp.com/api/ciudades', {
      departamento: departamento,
    });
  }

  registro(body: any) {
    console.log(body);
    return this.http.post(
      'https://combeneficios.herokuapp.com/api/register',
      body
    );
  }

  login(body: any) {
    return this.http.post(
      'https://combeneficios.herokuapp.com/api/login',
      body
    );
  }
}
