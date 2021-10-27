import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MailService } from 'src/app/services/mail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private mailService: MailService,
    private jwtHelper: JwtHelperService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.userService.getUser(token.id).subscribe((resp: any) => {
      console.log(resp);

      this.miFormulario.controls.nombre.setValue(
        resp.result[0].nombres + ' ' + resp.result[0].apellidos
      );
      this.miFormulario.controls.telefono.setValue(resp.result[0].telefono);
      this.miFormulario.controls.correo.setValue(resp.result[0].email);
    });
  }

  miFormulario: FormGroup = this.fb.group({
    asunto: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  contacto() {
    this.mailService.contacto(this.miFormulario.value).subscribe((Res) => {
      alert('peticion enviada');
      this.miFormulario.controls.asunto.setValue('');
      this.miFormulario.controls.mensaje.setValue('');
    });
  }
}
