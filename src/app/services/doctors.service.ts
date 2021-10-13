import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get('http://localhost:7000/api/doctors/medicos');
  }
  getDoctor(id: any) {
    return this.http.post('http://localhost:7000/api/doctors/medico', {
      id: id,
    });
  }
  getPregrade(id: any) {
    http: return this.http.post(
      'http://localhost:7000/api/doctors/medico/estudios',
      {
        id: id,
      }
    );
  }

  getEspecialization(id: any) {
    http: return this.http.post(
      'http://localhost:7000/api/doctors/medico/especializacion',
      {
        id: id,
      }
    );
  }

  register(id: any, body: any) {
    return this.http.post('http://localhost:7000/api/doctors/solicitud', {
      id: id,
      asunto: body.asunto,
      direccion: body.direccion,
      modalidad: body.modalidad,
      especializaciones_id: body.especializacion,
    });
  }

  getEspecs() {
    return this.http.get('http://localhost:7000/api/doctors/especializaciones');
  }

  studyrequest(body: any) {
    return this.http.post(
      'http://localhost:7000/api/doctors/medico/agregarEspecializacion',
      body
    );
  }

  getUniversity() {
    return this.http.get('http://localhost:7000/api/doctors/universidades');
  }
}
