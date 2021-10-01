import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = [];
  constructor(
    private jwtHelper: JwtHelperService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.userService.getUser(token.id).subscribe((resp: any) => {
      this.miFormulario.controls.nombres.setValue(resp.results[0].nombres);
      this.miFormulario.controls.apellidos.setValue(resp.results[0].apellidos);
      this.miFormulario.controls.email.setValue(resp.results[0].email);
      this.miFormulario.controls.telefono.setValue(resp.results[0].telefono);
      this.user.push(resp.results[0].imgUrl);
      console.log(resp.results[0]);
    });
  }

  miFormulario: FormGroup = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
  });
  ngOnInit(): void {}

  update() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.userService
      .updateUser(token.id, this.miFormulario.value)
      .subscribe((resp) => {
        alert('datos actualizados');
        location.reload();
      });
  }
}
