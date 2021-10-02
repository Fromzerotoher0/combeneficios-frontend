import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getDepartamentos() {
    return this.http.get('http://45.63.109.10:7000/api/departamentos');
  }

  cargarCiudades(departamento: any) {
    return this.http.post('http://45.63.109.10:7000/api/ciudades', {
      departamento: departamento,
    });
  }

  cargarParentesco() {
    return this.http.get('http://45.63.109.10:7000/api/parentesco');
  }

  registro(body: any) {
    console.log(body);
    return this.http.post('http://45.63.109.10:7000/api/register', body);
  }

  login(body: any) {
    return this.http.post('http://45.63.109.10:7000/api/login', body);
  }
}
