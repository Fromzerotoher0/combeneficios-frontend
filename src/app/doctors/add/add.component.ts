import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  miFormulario: FormGroup = this.fb.group({
    asunto: ['', [Validators.required]],
    modalidad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    especializacion: ['', Validators.required],
  });

  modalidad = ['presencial', 'virtual', 'presencial/virtual'];
  especializaciones: any;
  constructor(
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private doctorService: DoctorsService
  ) {
    this.doctorService.getEspecs().subscribe((resp: any) => {
      this.especializaciones = resp.results;
      console.log(this.especializaciones);
    });
  }

  contacto() {
    console.log(this.miFormulario.value);

    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.doctorService.register(token.id, this.miFormulario.value).subscribe(
      (resp) => {
        alert('solicitud enviada');
      },
      (err) => {
        alert(err.error.msg);
      }
    );
    this.miFormulario.reset();
    this.miFormulario.controls.modalidad.setValue('modalidad');
  }
}
