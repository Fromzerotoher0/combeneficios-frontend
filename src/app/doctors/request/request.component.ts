import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorsService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    public datepipe: DatePipe
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
  }
  new_date: any;
  rol: any;
  especializaciones: any;
  universidad: any;
  ngOnInit(): void {}
  miFormulario: FormGroup = this.fb.group({
    users_id: [''],
    especializaciones_id: ['', [Validators.required]],
    image: ['', [Validators.required]],
    otra: [''],
    universidad: ['', [Validators.required]],
    fecha_obtencion: ['', [Validators.required]],
  });

  onFileChange(event: any) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
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

  enviar() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    const uploadData = new FormData();
    uploadData.append('directorio', 'certificados');
    this.new_date = this.datepipe.transform(
      this.miFormulario.get('fecha_obtencion')!.value,
      'yyyy-MM-dd'
    );
    uploadData.append('medico_id', token.id);

    uploadData.append(
      'especializaciones_id',
      this.miFormulario.get('especializaciones_id')!.value
    );

    uploadData.append('image', this.miFormulario.get('image')!.value);
    uploadData.append(
      'universidad',
      this.miFormulario.get('universidad')!.value
    );
    uploadData.append('fecha_obtencion', this.new_date);

    this.doctorService.studyrequest(uploadData).subscribe(
      (resp) => {
        alert('solicitud enviada');
      },
      (err) => {
        alert(err.error.msg);
      }
    );
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
