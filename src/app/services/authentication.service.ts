import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';
import { LoginBody } from '../interfaces/loginBody.interface';
import { departamento } from '../interfaces/departamento.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  getDepartamentos() {
    return this.http.get('https://45.63.109.10:7000/api/users/departamentos');
  }

  cargarCiudades(departamento: departamento) {
    return this.http.post('https://45.63.109.10:7000/api/users/ciudades', {
      departamento: departamento,
    });
  }

  registro(body: any) {
    return this.http.post('https://45.63.109.10:7000/api/auth/register', body);
  }

  login(body: LoginBody): Observable<Login> {
    return this.http.post<Login>(
      'https://45.63.109.10:7000/api/auth/login',
      body
    );
  }
}
