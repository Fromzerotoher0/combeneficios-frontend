import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from 'src/app/services/doctors.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
})
export class AppointmentsListComponent implements OnInit {
  constructor(
    private doctorService: DoctorsService,
    private userService: UserService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;

    this.doctorService.getAppointmentsUser(token.id).subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp.result);
      console.log(resp.result);
    });
  }

  ngOnInit(): void {}
  dataSource: any;
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

  cancelar(cita: any, medico: any) {
    this.userService.cancelarCitaU(medico, cita).subscribe((resp) => {
      alert('cita cancelada');
    });
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'nombres',
    'apellidos',
    'acciones',
  ];
}
