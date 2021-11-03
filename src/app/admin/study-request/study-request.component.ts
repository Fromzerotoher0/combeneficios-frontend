import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-study-request',
  templateUrl: './study-request.component.html',
  styleUrls: ['./study-request.component.css'],
})
export class StudyRequestComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.adminService.getStudyRequest().subscribe((resp: any) => {
      this.solicitud = resp.result;
    });
  }
  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    medico_id: ['', [Validators.required]],
    universidad: ['', [Validators.required]],
    fecha_obtencion: ['', Validators.required],
    especializacion: ['', Validators.required],
    users_id: ['', Validators.required],
  });
  new_date: any;
  solicitud: any;
  rol: any;
  ngOnInit(): void {}
  approve(
    users_id: any,
    descripcion: any,
    universidad: any,
    medico_id: any,
    fecha_obtencion: any,
    especializacion: any
  ) {
    this.new_date = this.datepipe.transform(fecha_obtencion, 'yyyy-MM-dd');
    this.miFormulario.controls.users_id.setValue(users_id);
    this.miFormulario.controls.titulo.setValue(descripcion);
    this.miFormulario.controls.medico_id.setValue(medico_id);
    this.miFormulario.controls.universidad.setValue(universidad);
    this.miFormulario.controls.especializacion.setValue(especializacion);
    this.miFormulario.controls.fecha_obtencion.setValue(this.new_date);
    console.log(this.miFormulario.value);
    this.adminService.aprobarEspecializacion(this.miFormulario.value).subscribe(
      (resp: any) => {
        alert('solicitud aprobada');
        this.adminService.getStudyRequest().subscribe((resp: any) => {
          this.solicitud = resp.result;
        });
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }
  reject(users_id: any, medico_id: any) {
    this.miFormulario.controls.users_id.setValue(users_id);
    this.miFormulario.controls.medico_id.setValue(medico_id);
    alert('solicitud rechazada');
    this.adminService
      .rechazarEspecializacion(this.miFormulario.value)
      .subscribe((resp) => {
        this.adminService.getSolicitudes().subscribe((resp: any) => {
          this.solicitud = resp.result;
        });
      });
  }

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }
}
