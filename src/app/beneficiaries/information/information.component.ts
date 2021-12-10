import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  user: any = [];
  rol: any;
  beneficiary_id = 0;
  constructor(
    private jwtHelper: JwtHelperService,
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorsService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;

    this.beneficiary_id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.beneficiary_id).subscribe((resp: any) => {
      console.log(resp);

      this.miFormulario.controls.nombres.setValue(resp.result[0].nombres);
      this.miFormulario.controls.apellidos.setValue(resp.result[0].apellidos);
      this.miFormulario.controls.email.setValue(resp.result[0].email);
      this.miFormulario.controls.telefono.setValue(resp.result[0].telefono);
      this.user.push(resp.result[0].imgUrl);
    });

    if (this.rol === 4) {
      this.doctorService
        .getStudies(this.beneficiary_id)
        .subscribe((resp: any) => {
          console.log(resp);
          this.estudios = resp.result;
        });
    }
  }

  miFormulario: FormGroup = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
  });

  formImage: FormGroup = this.fb.group({
    image: ['', []],
  });
  ngOnInit(): void {}
  estudios: any;
  uploadData: any = new FormData();
  token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
  update() {
    this.user = [];
    this.beneficiary_id = this.activatedRoute.snapshot.params['id'];
    this.userService
      .updateUser(this.beneficiary_id, this.miFormulario.value)
      .subscribe((resp) => {
        alert('datos actualizados');
        this.userService.getUser(this.beneficiary_id).subscribe((resp: any) => {
          this.miFormulario.controls.nombres.setValue(resp.result[0].nombres);
          this.miFormulario.controls.apellidos.setValue(
            resp.result[0].apellidos
          );
          this.miFormulario.controls.email.setValue(resp.result[0].email);
          this.miFormulario.controls.telefono.setValue(resp.result[0].telefono);
          this.user.push(resp.result[0].imgUrl);
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
          this.formImage
            .get('image')!
            .setValue(file, { emitModelToViewChange: false });

          this.uploadData.append('image', this.formImage.get('image')?.value);
          this.uploadData.append('id', this.token.id);
          this.uploadData.append('directorio', 'users');
          this.foto();
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert('solo se admiten imagenes');
      }
    }
  }

  foto() {
    this.authService.cambiarFoto(this.uploadData).subscribe((resp) => {
      alert('foto actualizada');
      this.beneficiary_id = this.activatedRoute.snapshot.params['id'];
      this.userService.getUser(this.beneficiary_id).subscribe((resp: any) => {
        console.log(resp);
        this.user = [];
        this.miFormulario.controls.nombres.setValue(resp.result[0].nombres);
        this.miFormulario.controls.apellidos.setValue(resp.result[0].apellidos);
        this.miFormulario.controls.email.setValue(resp.result[0].email);
        this.miFormulario.controls.telefono.setValue(resp.result[0].telefono);
        this.user.push(resp.result[0].imgUrl);
      });
    });
  }
}
