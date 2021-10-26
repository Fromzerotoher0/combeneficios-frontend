import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { departamento } from 'src/app/interfaces/departamento.interface';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  hide = true;
  get passwordInput() {
    return this.miFormulario.get('contrasena')!;
  }
  mindate: any;
  value = '';
  departamentos: any = [];
  ciudades: any = [];
  filename: String = '';
  formData: FormData = new FormData();
  tipo_id = ['Cedula', 'Pasaporte', 'Tarjeta de identidad'];
  sexo = ['Masculino', 'Femenino', 'otro'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public mediaObserver: MediaObserver
  ) {
    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.departamentos = resp.result;
    });
  }

  public currentYear = new Date().getFullYear();
  maxDate = new Date(this.currentYear + 1, 11, 31);

  //formulario reactivo para obtener los datos del usuario a registrar
  miFormulario: FormGroup = this.fb.group({
    tipo_id: ['', [Validators.required]],
    nro_documento: ['', [Validators.required, Validators.minLength(6)]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    fecha_nacimiento: ['', [Validators.required]],
    image: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
  });

  cargarCiudades(departamento: departamento) {
    console.log(departamento);

    this.authService.cargarCiudades(departamento).subscribe((resp: any) => {
      this.ciudades = resp.result;
      console.log(this.ciudades);
    });
  }

  //metodo para obtener una imagen y validar que tenga los formatos correctos
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

  //metodo para registar un nuevo usuario

  registro() {
    console.log(this.miFormulario.value);
    //formData para poder enviar una imagen con el formulario
    //se le asignan los valores del formulario reactivo
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
    uploadData.append(
      'departamento',
      this.miFormulario.get('departamento')!.value
    );
    uploadData.append('ciudad', this.miFormulario.get('ciudad')!.value);

    this.authService.registro(uploadData).subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigateByUrl(`/auth/login`);
      },
      (err) => {
        if (err.error == undefined) {
          alert('debe diligenciar todos los campos');
        } else {
          alert(err.error.msg);
        }
      }
    );
  }
}
