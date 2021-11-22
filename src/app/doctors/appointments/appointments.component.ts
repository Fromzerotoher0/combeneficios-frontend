import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from '../../services/doctors.service';
declare var subscripcion: any;
declare var message: any;
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorsService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.doctor_id = this.activatedRoute.snapshot.params['id'];
    this.doctorService.getAgenda(this.doctor_id).subscribe((resp: any) => {
      this.citas = resp.result;
      console.log(this.citas);
    });
  }

  ngOnInit(): void {}
  rol: any;
  doctor_id: any;
  citas: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  agendar(agenda: any, medico: any) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService
      .appointment(agenda, token.id, medico)
      .subscribe((resp: any) => {
        this.doctor_id = this.activatedRoute.snapshot.params['id'];
        this.doctorService.getAgenda(this.doctor_id).subscribe((resp: any) => {
          this.citas = resp.result;
          // subscripcion();
          // message('cita agendada');
          alert('cita agendada');
          this.router.navigateByUrl('/medicos/servicios');
        });
      });
  }
}
