import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MailService } from 'src/app/services/mail.service';
import { DoctorsService } from '../../services/doctors.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorsService,
    private jwtHelper: JwtHelperService,
    private DatePipe: DatePipe
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.doctorService.getStudies(token.id).subscribe((resp: any) => {
      this.especializaciones = resp.result;
      console.log(this.especializaciones);
    });
    this.doctorService.getModalidad(token.id).subscribe((resp: any) => {
      this.modalidad = resp.result;
      console.log(this.modalidad);
    });
  }

  miFormulario: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    especializacion: ['', [Validators.required]],
    modalidad: ['', Validators.required],
  });

  rol: any;
  especializaciones: any;
  new_date: any;
  modalidad: any;
  tarifa: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  cargarTarifa(titulo: any) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService.getTarifa(token.id, titulo).subscribe((resp: any) => {
      this.tarifa = resp.result;
    });
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  agendar() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.new_date = this.DatePipe.transform(
      this.miFormulario.controls.fecha.value,
      'yyyy-MM-dd'
    );

    this.doctorService
      .agenda(this.miFormulario.value, this.tarifa, this.new_date, token.id)
      .subscribe(
        (resp) => {
          Swal.fire({
            title: 'Cita agendada',
            text: '',
            icon: 'success',
            confirmButtonText: 'ok',
          });
          this.miFormulario.reset();
        },
        (err) => {
          alert(err.message);
        }
      ),
      console.log(this.new_date);

    console.log(this.miFormulario.value);
  }
}
