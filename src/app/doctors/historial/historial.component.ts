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
      this.arreglo = this.dataSource;
    });
  }

  ngOnInit(): void {}
  rol: any;
  dataSource: any;
  valor: any;
  initDatasource: any;
  allComplete: any;
  check: any;
  arreglo: any;
  data: { id: number; calificacion: number } = {} as {
    id: number;
    calificacion: number;
  };
  calificacion: any = [];
  busqueda: any;
  duplicados: any;

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
    'acciones',
  ];

  calificar(calificacion: any, id: any) {
    // const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    // this.doctorService.calificar(id, calificacion).subscribe((resp) => {
    //   alert('cita calificada');
    //   this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
    //     console.log(resp);
    //     this.dataSource = new MatTableDataSource(resp.result);
    //   });
    // });
    this.data = {
      id: id,
      calificacion: calificacion,
    };
    this.calificacion.push(this.data);
    console.log(this.calificacion);
  }

  confirmar(completed: string, id: any) {
    if (completed == 'si') {
      const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
      this.userService.asistencia(id, 1).subscribe((resp) => {
        alert('asistencia confirmada');
        this.doctorService
          .calificar(id, this.calificacion)
          .subscribe((resp) => {});
        this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
          console.log(resp);
          this.dataSource = new MatTableDataSource(resp.result);
        });
      });
    } else {
      if (this.calificacion.length == 1) {
        const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
        this.doctorService
          .calificar(id, this.calificacion[0].calificacion)
          .subscribe((resp) => {
            alert('calificacion editada');
            this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
              console.log(resp);
              this.dataSource = new MatTableDataSource(resp.result);
            });
          });
      } else {
        const busqueda = this.calificacion.reduce((acc: any, persona: any) => {
          acc[persona.id] = ++acc[persona.id] || 0;
          return acc;
        }, {});
        this.duplicados = this.calificacion.filter((persona: any) => {
          return busqueda[persona.id];
        });

        console.log(this.duplicados[this.duplicados.length - 1].calificacion);
        console.log(this.duplicados);
        const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
        this.doctorService
          .calificar(
            id,
            this.duplicados[this.duplicados.length - 1].calificacion
          )
          .subscribe((resp) => {
            alert('calificacion editada');
          });
        this.doctorService.getHistorial(token.id).subscribe((resp: any) => {
          console.log(resp);
          this.dataSource = new MatTableDataSource(resp.result);
        });
      }
    }
  }

  //   checked(evento: any) {
  //     this.check = evento;
  //   }

  //   confirmar() {
  //     console.log(this.check);
  //   }

  toggle(event: any, id: any) {
    if (event == true) {
      for (let i = 0; i <= this.dataSource.filteredData.length; i++) {
        if (this.dataSource.filteredData[i].id == id) {
          this.dataSource.filteredData[i].asistio = 'si';
          this.dataSource.filteredData[i].enviado = 'no';
          this.dataSource.filteredData[i].calificar = 'no';
          console.log(this.dataSource.filteredData[i]);
        }
      }
    } else {
      for (let i = 0; i <= this.dataSource.filteredData.length; i++) {
        if (this.dataSource.filteredData[i].id == id) {
          this.dataSource.filteredData[i].asistio = 'no';
          this.dataSource.filteredData[i].enviado = 'nou';
          this.dataSource.filteredData[i].calificar = 'no';
          console.log(this.dataSource.filteredData[i]);
        }
      }
    }
  }
}
