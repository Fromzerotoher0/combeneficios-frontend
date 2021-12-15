import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

    this.doctorService.getAppointments(token.id).subscribe((resp: any) => {
      console.log(resp);

      this.dataSource = new MatTableDataSource(resp.result);
    });
  }

  ngOnInit(): void {}
  public dataSource: any;
  public rol: any;
  public citas: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  displayedColumns: string[] = [
    'name',
    'weight',
    'nombres',
    'apellidos',
    'especialidad',
    'modalidad',
    'acciones',
  ];

  cancelar(id: string, email: string) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService.cancelAppointment(id, email).subscribe((resp) => {
      alert('cita cancelada');
      this.doctorService.getAppointments(token.id).subscribe((resp: any) => {
        console.log(resp);

        this.dataSource = new MatTableDataSource(resp.result);
      });
    });
  }

  confirmar() {
    console.log('confirmado');
  }

  completar(id: any) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService.completeAppointment(id).subscribe((resp) => {
      alert('cita completada');
      this.doctorService.getAppointments(token.id).subscribe((resp: any) => {
        console.log(resp);

        this.dataSource = new MatTableDataSource(resp.result);
      });
    });
  }

  cita(url: string) {
    window.location.href = url;
  }
}
