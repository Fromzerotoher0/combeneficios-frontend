import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorsService } from 'src/app/services/doctors.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private doctorService: DoctorsService,
    private userService: UserService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp.result);
    });
  }

  ngOnInit(): void {}
  rol: any;
  dataSource: any;
  valor: any;
  initDatasource: any;
  allComplete: any;
  check: any;

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  displayedColumns: string[] = [
    'fecha',
    'hora',
    'especialidad',
    'nombre',
    'asistio',
    'calificacion',
  ];

  calificar(calificacion: any, id: any) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService.calificar(id, calificacion).subscribe((resp) => {
      alert('cita calificada');
      this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp.result);
      });
    });
  }

  setAll(completed: boolean, id: any) {
    if (completed == true) {
      const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
      this.userService.asistencia(id, 1).subscribe((resp) => {
        alert('asistencia confirmada');
        this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
          console.log(resp);
          this.dataSource = new MatTableDataSource(resp.result);
        });
      });
    } else {
      const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
      this.userService.asistencia(id, 0).subscribe((resp) => {
        alert('asistencia editada');
        this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
          console.log(resp);
          this.dataSource = new MatTableDataSource(resp.result);
        });
      });
    }
  }

  //   checked(evento: any) {
  //     this.check = evento;
  //   }

  //   confirmar() {
  //     console.log(this.check);
  //   }
}
