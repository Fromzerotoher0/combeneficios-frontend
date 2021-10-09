import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  solicitud: any;
  token = localStorage.getItem('jwt');
  constructor(private adminService: AdminService) {
    this.adminService.getSolicitudes().subscribe((resp: any) => {
      this.solicitud = resp.results;
    });
  }

  approve(
    id: any,
    direccion: any,
    correo: any,
    modalidad: any,
    especializacion: any
  ) {
    this.adminService
      .aprobarSolicitud(id, direccion, correo, modalidad, especializacion)
      .subscribe(
        (resp: any) => {
          alert('solicitud aprobada');
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
      },
      (err) => {
        alert(err.error.msg);
      }
    );
    console.log(id, correo);
  }

  ngOnInit(): void {}
}
