import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from 'src/app/services/doctors.service';
declare var init: any;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorsService
  ) {
    init();
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.doctorService
      .getAppointment(this.activatedRoute.snapshot.params['id'])
      .subscribe((resp: any) => {
        this.cita = resp.result;
        console.log(this.cita);
      });
  }

  rol: any;
  cita: any;
  ngOnInit(): void {}

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  agendar() {
    localStorage.setItem('agenda', this.cita[0].id);
    localStorage.setItem('medico_id', this.cita[0].medico_id);
    localStorage.setItem('modalidad', this.cita[0].modalidad);
  }
}
