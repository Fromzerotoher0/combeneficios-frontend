import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css'],
})
export class ScheduleListComponent implements OnInit {
  constructor(
    private doctorService: DoctorsService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;

    this.doctorService.getAppointments(token.id).subscribe((resp) => {
      console.log(resp);
    });
  }

  ngOnInit(): void {}

  rol: any;
  citas: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }
}
