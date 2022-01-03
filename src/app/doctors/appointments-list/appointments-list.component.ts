import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from 'src/app/services/doctors.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
    private router: Router,
    private modalService: BsModalService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;

    this.doctorService.getAppointmentsUser(token.id).subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp.result);
      console.log(resp.result);
    });
  }

  modalRef!: BsModalRef;
  ngOnInit(): void {}
  dataSource: any;
  rol: any;
  citas: any;
  id: any;
  medico_id: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  ir(url: any) {
    window.location.href = url;
  }

  displayedColumns: string[] = ['name', 'weight', 'medico', 'acciones'];

  openModal(template: TemplateRef<any>, id: any, medico_id: any) {
    this.modalRef = this.modalService.show(template);
    this.id = id;
    this.medico_id = medico_id;
  }

  prueba() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.userService.cancelarCita(this.medico_id, this.id).subscribe((resp) => {
      alert('cita cancelada');
      this.doctorService
        .getAppointmentsUser(token.id)
        .subscribe((resp: any) => {
          this.dataSource = new MatTableDataSource(resp.result);
          console.log(resp.result);
          this.modalRef.hide();
        });
    });
  }
}
