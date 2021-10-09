import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getSolicitudes() {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });
    return this.http.get('http://localhost:7000/api/admin/solicitud', {
      headers: header,
    });
  }

  rechazarsolicitud(id: any, correo: any) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });
    return this.http.post(
      'http://localhost:7000/api/admin/rechazar',
      { id: id, correo: correo },
      {
        headers: header,
      }
    );
  }
  aprobarSolicitud(
    id: any,
    direccion: any,
    correo: any,
    modalidad: any,
    especializacion: any
  ) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });
    return this.http.post(
      'http://localhost:7000/api/admin/aprobar',
      {
        id: id,
        modalidad: modalidad,
        especializaciones_id: especializacion,
        direccion: direccion,
        correo: correo,
      },
      { headers: header }
    );
  }
}
