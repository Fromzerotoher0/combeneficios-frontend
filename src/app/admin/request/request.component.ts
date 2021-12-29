import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  solicitud: any;
  rol: any;
  token = localStorage.getItem('jwt');
  constructor(
    private adminService: AdminService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;

    this.adminService.getSolicitudes().subscribe((resp: any) => {
      this.solicitud = resp.result;
    });
  }

  approve(
    id: any,
    direccion: any,
    correo: any,
    modalidad: any,
    especializacion: any,
    universidad: any,
    departamento: any,
    ciudad: any,
    tarifa: any
  ) {
    this.adminService
      .aprobarSolicitud(
        id,
        direccion,
        correo,
        modalidad,
        especializacion,
        universidad,
        departamento,
        ciudad,
        tarifa
      )
      .subscribe(
        (resp: any) => {
          alert('solicitud aprobada');
          this.adminService.getSolicitudes().subscribe((resp: any) => {
            this.solicitud = resp.result;
          });
        },
        (err) => {
          alert(err.error.msg);
        }
      );
  }

  reject(id: any, correo: any) {
    this.adminService.rechazarsolicitud(id, correo).subscribe(
      (resp: any) => {
        alert('solicitud rechazada');
        this.adminService.getSolicitudes().subscribe((resp: any) => {
          this.solicitud = resp.result;
        });
      },
      (err) => {
        alert(err.error.msg);
      }
    );
    console.log(id, correo);
  }

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  ngOnInit(): void {}
}
