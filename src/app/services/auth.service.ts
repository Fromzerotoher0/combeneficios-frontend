import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';
import { LoginBody } from '../interfaces/loginBody.interface';
import { departamento } from '../interfaces/departamento.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getDepartamentos() {
    return this.http.get('http://45.63.109.10:7000/api/departamentos');
  }

  cargarCiudades(departamento: departamento) {
    return this.http.post('http://45.63.109.10:7000/api/ciudades', {
      departamento: departamento,
    });
  }

  cargarParentesco() {
    return this.http.get('http://45.63.109.10:7000/api/parentesco');
  }

  registro(body: any) {
    return this.http.post('http://45.63.109.10:7000/api/register', body);
  }

  login(body: LoginBody): Observable<Login> {
    return this.http.post<Login>('http://45.63.109.10:7000/api/login', body);
  }
}
