import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get('https://45.63.109.10:7000/api/doctors/medicos');
  }
  getDoctor(id: any) {
    return this.http.post('https://45.63.109.10:7000/api/doctors/medico', {
      id: id,
    });
  }
  getPregrade(id: any) {
    http: return this.http.post(
      'https://45.63.109.10:7000/api/doctors/medico/estudios',
      {
        id: id,
      }
    );
  }

  getStudies(id: any) {
    http: return this.http.post(
      'https://45.63.109.10:7000/api/doctors/medico/especializaciones',
      {
        id: id,
      }
    );
  }

  getEspecialization(id: any) {
    http: return this.http.post(
      'https://45.63.109.10:7000/api/doctors/medico/especializacion',
      {
        id: id,
      }
    );
  }

  register(id: any, body: any) {
    return this.http.post('https://45.63.109.10:7000/api/doctors/solicitud', {
      id: id,
      asunto: body.asunto,
      direccion: body.direccion,
      modalidad: body.modalidad,
      especializaciones_id: 1,
      universidad: body.universidad,
    });
  }

  getEspecs() {
    return this.http.get(
      'https://45.63.109.10:7000/api/doctors/especializaciones'
    );
  }

  studyrequest(body: any) {
    return this.http.post(
      'https://45.63.109.10:7000/api/doctors/medico/agregarEspecializacion',
      body
    );
  }

  getUniversity() {
    return this.http.get('https://45.63.109.10:7000/api/doctors/universidades');
  }

  agenda(body: any, fecha: any, id: any) {
    return this.http.post('https://45.63.109.10:7000/api/doctors/agenda', {
      fecha: body.fecha,
      hora: body.hora,
      especialidad: body.especializacion,
      tarifa: body.tarifa,
      medico_id: id,
    });
  }

  getAgenda(medico_id: any) {
    return this.http.post(
      'https://45.63.109.10:7000/api/doctors/agendaMedico',
      {
        medico_id: medico_id,
      }
    );
  }

  appointment(agenda: any, beneficiario: any, medico: any) {
    console.log(agenda, beneficiario);

    return this.http.post('https://45.63.109.10:7000/api/doctors/agendaCita', {
      beneficiario_id: beneficiario,
      agenda_id: agenda,
      medico_id: medico,
    });
  }

  getAppointments(medico_id: any) {
    return this.http.post('https://45.63.109.10:7000/api/doctors/citas', {
      medico_id: medico_id,
    });
  }

  getAppointmentsUser(id: any) {
    return this.http.post(
      'https://45.63.109.10:7000/api/doctors/citasUsuario',
      {
        id: id,
      }
    );
  }
}
