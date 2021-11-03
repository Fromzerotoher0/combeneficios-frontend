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

  getStudyRequest() {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });
    return this.http.get('http://localhost:7000/api/admin/solicitudEstudio', {
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
    especializacion: any,
    universidad: any
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
        universidad: universidad,
      },
      { headers: header }
    );
  }
  aprobarEspecializacion(body: any) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });
    return this.http.post(
      'http://localhost:7000/api/admin/aceptarEstudio',
      {
        users_id: body.users_id,
        titulo: body.titulo,
        medico_id: body.medico_id,
        universidad: body.universidad,
        fecha_obtencion: body.fecha_obtencion,
        especializacion: body.especializacion,
      },
      { headers: header }
    );
  }

  rechazarEspecializacion(body: any) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });
    return this.http.post(
      'http://localhost:7000/api/admin/rechazarEstudio',
      {
        users_id: body.users_id,
        medico_id: body.medico_id,
      },
      { headers: header }
    );
  }
}
