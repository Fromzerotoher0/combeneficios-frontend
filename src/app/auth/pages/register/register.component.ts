import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  departamentos: any = [];
  ciudades: any = [];
  tipo_id = ['Cedula', 'Pasaporte', 'Tarjeta de identidad'];
  sexo = ['Masculino', 'Femenino', 'otro'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.departamentos = resp.results;
      console.log(this.departamentos);
    });
  }

  miFormulario: FormGroup = this.fb.group({
    tipo_id: ['', [Validators.required]],
    nro_documento: ['', [Validators.required, Validators.minLength(6)]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    fecha_nacimiento: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
  });

  cargarCiudades(departamento: any) {
    this.authService.cargarCiudades(departamento).subscribe((resp: any) => {
      this.ciudades = resp.results;
    });
  }

  registro() {
    this.authService.registro(this.miFormulario.value).subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigateByUrl(`/auth/login`);
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }
}
