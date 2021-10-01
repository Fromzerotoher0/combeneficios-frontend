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
      this.miFormulario.controls.nombre.setValue(
        resp.results[0].nombres + ' ' + resp.results[0].apellidos
      );
      this.miFormulario.controls.telefono.setValue(resp.results[0].telefono);
      this.miFormulario.controls.email.setValue(resp.results[0].email);
    });
  }

  miFormulario: FormGroup = this.fb.group({
    asunto: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  contacto() {
    this.mailService.contacto(this.miFormulario.value).subscribe((Res) => {
      alert('peticion enviada');
      this.miFormulario.controls.asunto.setValue('');
      this.miFormulario.controls.mensaje.setValue('');
    });
  }
}
