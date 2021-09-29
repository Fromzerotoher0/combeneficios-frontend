import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

  contacto(body: any) {
    return this.http.post('http://localhost:3000/mail', body);
  }
}
