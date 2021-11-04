import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { updateBody } from '../interfaces/updateBody.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: any) {
    return this.http.post('https://45.63.109.10:7000/api/users/user', {
      id: id,
    });
  }

  updateUser(id: any, body: updateBody) {
    return this.http.put('https://45.63.109.10:7000/api/users/user', {
      id: id,
      nombres: body.nombres,
      apellidos: body.apellidos,
      email: body.email,
      telefono: body.telefono,
    });
  }

  getBeneficiaries(id: any) {
    return this.http.post('https://45.63.109.10:7000/api/users/beneficiaries', {
      id: id,
    });
  }

  registerBeneficiaries(body: any) {
    return this.http.post(
      'https://45.63.109.10:7000/api/beneficiaries/register',
      body
    );
  }
}
