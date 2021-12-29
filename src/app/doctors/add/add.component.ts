import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    universidad: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    tarifa: ['', [Validators.required]],
  });
  universidad: any;
  modalidad = ['presencial', 'virtual', 'presencial/virtual'];
  especializaciones: any;
  rol: any;
  departamentos: any;
  ciudades: any;
  constructor(
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private doctorService: DoctorsService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;

    this.doctorService.getEspecs().subscribe((resp: any) => {
      this.especializaciones = resp.result;
      console.log(this.especializaciones);
    });
    this.doctorService.getUniversity().subscribe((resp: any) => {
      this.universidad = resp.result;
      console.log(this.universidad);
    });

    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.departamentos = resp.result;
    });
  }

  contacto() {
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

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  cargarCiudades(departamento: any) {
    this.authService.cargarCiudades(departamento).subscribe((resp: any) => {
      this.ciudades = resp.result;
      console.log(this.ciudades);
    });
  }
}
