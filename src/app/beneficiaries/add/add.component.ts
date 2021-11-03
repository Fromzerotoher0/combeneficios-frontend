import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  hide = true;
  public currentYear = new Date().getFullYear();
  maxDate = new Date(this.currentYear + 1, 11, 31);
  departamentos: any = [];
  ciudades: any = [];
  filename: String = '';
  formData: FormData = new FormData();
  tipo_id = ['Cedula', 'Pasaporte', 'Tarjeta de identidad'];
  sexo = ['Masculino', 'Femenino', 'otro'];
  parentesco = [2, 3, 4, 5, 6];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private userService: UserService
  ) {
    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.departamentos = resp.result;
      console.log(this.departamentos);
    });
  }

  miFormulario: FormGroup = this.fb.group({
    tipo_id: ['', [Validators.required]],
    nro_documento: ['', [Validators.required, Validators.minLength(6)]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    parentesco: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    fecha_nacimiento: ['', [Validators.required]],
    image: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
  });

  cargarCiudades(departamento: any) {
    this.authService.cargarCiudades(departamento).subscribe((resp: any) => {
      this.ciudades = resp.result;
    });
  }

  get passwordInput() {
    return this.miFormulario.get('contrasena')!;
  }

  onFileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);

      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          this.miFormulario
            .get('image')!
            .setValue(file, { emitModelToViewChange: false });
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert('solo se admiten imagenes');
      }
    }
  }

  registro() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);

    const uploadData = new FormData();
    uploadData.append('tipo_id', this.miFormulario.get('tipo_id')!.value);
    uploadData.append(
      'nro_documento',
      this.miFormulario.get('nro_documento')!.value
    );
    uploadData.append('nombres', this.miFormulario.get('nombres')!.value);
    uploadData.append('apellidos', this.miFormulario.get('apellidos')!.value);
    uploadData.append('sexo', this.miFormulario.get('sexo')!.value);
    uploadData.append('correo', this.miFormulario.get('correo')!.value);
    uploadData.append('telefono', this.miFormulario.get('telefono')!.value);
    uploadData.append('contrasena', this.miFormulario.get('contrasena')!.value);
    uploadData.append(
      'fecha_nacimiento',
      this.miFormulario.get('fecha_nacimiento')!.value
    );
    uploadData.append('image', this.miFormulario.get('image')!.value);
    uploadData.append('parentesco', this.miFormulario.get('parentesco')!.value);
    uploadData.append(
      'departamento',
      this.miFormulario.get('departamento')!.value
    );
    uploadData.append('titular_id', token.id);
    uploadData.append('ciudad', this.miFormulario.get('ciudad')!.value);

    this.userService.registerBeneficiaries(uploadData).subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigateByUrl(`/beneficiarios/lista`);
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }
}
