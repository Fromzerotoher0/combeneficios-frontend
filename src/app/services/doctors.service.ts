import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get(
      'https://api.combeneficios.co:7000/api/doctors/medicos'
    );
  }
  getDoctorsCity() {
    return this.http.get(
      'https://api.combeneficios.co:7000/api/doctors/medicosCiudad'
    );
  }
  getDoctorsByCity(body: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/medicosByCiudad',
      {
        ciudad: body,
      }
    );
  }
  getDoctor(id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/medico',
      {
        id: id,
      }
    );
  }
  getPregrade(id: any) {
    http: return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/medico/estudios',
      {
        id: id,
      }
    );
  }

  getStudies(id: any) {
    http: return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/medico/especializaciones',
      {
        id: id,
      }
    );
  }

  getModalidad(id: any) {
    http: return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/modalidad',
      {
        id: id,
      }
    );
  }

  getEspecialization(id: any) {
    http: return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/medico/posgrado',
      {
        id: id,
      }
    );
  }

  register(id: any, body: any) {
    console.log(body);

    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/solicitud',
      {
        id: id,
        asunto: body.asunto,
        direccion: body.direccion,
        modalidad: body.modalidad,
        especializaciones_id: 1,
        departamento: body.departamento,
        ciudad: body.ciudad,
        universidad: body.universidad,
        tarifa: body.tarifa,
      }
    );
  }

  getEspecs() {
    return this.http.get(
      'https://api.combeneficios.co:7000/api/doctors/especializaciones'
    );
  }

  getDEspecs() {
    return this.http.get(
      'https://api.combeneficios.co:7000/api/doctors/especializacionDisponible'
    );
  }

  studyrequest(body: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/medico/agregarEspecializacion',
      body
    );
  }

  getUniversity() {
    return this.http.get(
      'https://api.combeneficios.co:7000/api/doctors/universidades'
    );
  }

  agenda(body: any, tarifa: any, fecha: any, id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/agenda',
      {
        fecha: body.fecha,
        hora: body.hora,
        especialidad: body.especializacion,
        tarifa: tarifa,
        modalidad: body.modalidad,
        medico_id: id,
      }
    );
  }

  getAgenda(medico_id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/agendaMedico',
      {
        medico_id: medico_id,
      }
    );
  }

  appointment(agenda: any, beneficiario: any, medico: any, modalidad: any) {
    console.log(agenda, beneficiario);

    return this.http.post(
      'https://api.combeneficios.co:7000/api/beneficiaries/agendar',
      {
        beneficiario_id: beneficiario,
        agenda_id: agenda,
        medico_id: medico,
        modalidad: modalidad,
      }
    );
  }

  getAppointments(medico_id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/citas',
      {
        medico_id: medico_id,
      }
    );
  }

  getAppointmentsUser(id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/beneficiaries/citas',
      {
        id: id,
      }
    );
  }

  cancelAppointment(id: any, email: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/cancelarCita',
      {
        id: id,
        email: email,
      }
    );
  }
  completeAppointment(id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/completarCita',
      {
        id: id,
      }
    );
  }

  getHistorial(id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/beneficiaries/historial',
      {
        id: id,
      }
    );
  }

  calificar(id: any, calificacion: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/beneficiaries/calificar',
      {
        id: id,
        calificacion: calificacion,
      }
    );
  }

  getAppointment(id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/beneficiaries/cita',
      {
        id: id,
      }
    );
  }

  getTarifa(id: any, titulo: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/tarifas',
      {
        id: id,
        titulo: titulo,
      }
    );
  }

  aceptar(id: any) {
    return this.http.post(
      'https://api.combeneficios.co:7000/api/doctors/aceptar',
      {
        id: id,
      }
    );
  }
}
