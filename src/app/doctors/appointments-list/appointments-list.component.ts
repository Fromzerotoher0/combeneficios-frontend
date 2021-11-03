import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from 'src/app/services/doctors.service';
@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
})
export class AppointmentsListComponent implements OnInit {
  constructor(
    private doctorService: DoctorsService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;

    this.doctorService.getAppointmentsUser(token.id).subscribe((resp: any) => {
      console.log(resp);

      this.dataSource = new MatTableDataSource(resp.result);
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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
