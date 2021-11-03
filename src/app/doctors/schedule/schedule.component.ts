import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MailService } from 'src/app/services/mail.service';
import { DoctorsService } from '../../services/doctors.service';
import { DatePipe } from '@angular/common';

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
  }

  miFormulario: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    especializacion: ['', [Validators.required]],
    tarifa: ['', [Validators.required]],
  });

  rol: any;
  especializaciones: any;
  new_date: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
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
      .agenda(this.miFormulario.value, this.new_date, token.id)
      .subscribe(
        (resp) => {
          alert('cita añadida a la agenda');
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
