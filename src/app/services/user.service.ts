import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: any) {
    console.log(id);
    return this.http.post('https://combeneficios.herokuapp.com/api/user', {
      id: id,
    });
  }

  updateUser(id: any, body: any) {
    console.log(body.telefono);

    return this.http.put('https://combeneficios.herokuapp.com/api/user', {
      id: id,
      nombres: body.nombres,
      apellidos: body.apellidos,
      email: body.email,
      telefono: body.telefono,
    });
  }

  getBeneficiaries(id: any) {
    return this.http.post(
      'https://combeneficios.herokuapp.com/api/beneficiaries',
      {
        id: id,
      }
    );
  }
}
