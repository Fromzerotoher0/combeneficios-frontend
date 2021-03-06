import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

  contacto(body: any) {
    return this.http.post('https://api.combeneficios.co:7000/api/mail', body);
  }
}
