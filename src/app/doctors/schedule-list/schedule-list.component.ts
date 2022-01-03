import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from 'src/app/services/doctors.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css'],
})
export class ScheduleListComponent implements OnInit {
  constructor(
    private doctorService: DoctorsService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private modalService: BsModalService
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
  public modalRef!: BsModalRef;
  agenda_id: any;
  email: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  displayedColumns: string[] = ['name', 'weight', 'paciente', 'acciones'];

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

  aceptar(id: any) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService.aceptar(id).subscribe(
      (resp) => {
        alert('cita confirmada');

        this.doctorService.getAppointments(token.id).subscribe((resp: any) => {
          console.log(resp);

          this.dataSource = new MatTableDataSource(resp.result);
        });
      },
      (err) => {
        alert(err);
      }
    );
  }

  completar() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService.completeAppointment(this.agenda_id).subscribe((resp) => {
      alert('cita completada');
      this.doctorService.getAppointments(token.id).subscribe((resp: any) => {
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp.result);
        this.modalRef.hide();
      });
    });
  }

  cita(url: string) {
    window.location.href = url;
  }

  openModal(template: TemplateRef<any>, agenda_id: any, email: any) {
    this.modalRef = this.modalService.show(template);
    this.agenda_id = agenda_id;
    this.email = email;
  }

  completeModal(template: TemplateRef<any>, agenda_id: any) {
    this.modalRef = this.modalService.show(template);
    this.agenda_id = agenda_id;
  }

  cancel() {
    alert('xd');
  }
}
