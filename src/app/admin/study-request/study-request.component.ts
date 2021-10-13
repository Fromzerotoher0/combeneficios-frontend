import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-study-request',
  templateUrl: './study-request.component.html',
  styleUrls: ['./study-request.component.css'],
})
export class StudyRequestComponent implements OnInit {
  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.adminService.getStudyRequest().subscribe((resp: any) => {
      this.solicitud = resp.results;
    });
  }
  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    medico_id: ['', [Validators.required]],
    universidad: ['', [Validators.required]],
    fecha_obtencion: ['', Validators.required],
  });

  solicitud: any;
  ngOnInit(): void {}
  approve(
    descripcion: any,
    universidad: any,
    medico_id: any,
    fecha_obtencion: any
  ) {
    this.miFormulario.controls.titulo.setValue(descripcion);
    this.miFormulario.controls.medico_id.setValue(medico_id);
    this.miFormulario.controls.universidad.setValue(universidad);
    this.miFormulario.controls.fecha_obtencion.setValue(fecha_obtencion);

    this.adminService.aprobarEspecializacion(this.miFormulario.value).subscribe(
      (resp: any) => {
        alert('solicitud aprobada');
        this.adminService.getSolicitudes().subscribe((resp: any) => {
          this.solicitud = resp.results;
        });
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }
  reject() {}
}
