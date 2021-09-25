import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getDepartamentos() {
    return this.http.get('http://localhost:3000/departamentos');
  }

  cargarCiudades(departamento: any) {
    console.log(departamento);
    return this.http.post('http://localhost:3000/ciudades', {
      departamento: departamento,
    });
  }

  registro(body: any) {
    console.log(body);
    return this.http.post('http://localhost:3000/register', body);
  }

  login(body: any) {
    return this.http.post('http://localhost:3000/login', body);
  }
}
