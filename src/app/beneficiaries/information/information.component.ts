import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  user: any = [];
  beneficiary_id = 0;
  constructor(
    private jwtHelper: JwtHelperService,
    private userService: UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.beneficiary_id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.beneficiary_id).subscribe((resp: any) => {
      console.log(resp);

      this.miFormulario.controls.nombres.setValue(resp.result[0].nombres);
      this.miFormulario.controls.apellidos.setValue(resp.result[0].apellidos);
      this.miFormulario.controls.email.setValue(resp.result[0].email);
      this.miFormulario.controls.telefono.setValue(resp.result[0].telefono);
      this.user.push(resp.result[0].imgUrl);
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
    this.user = [];
    this.beneficiary_id = this.activatedRoute.snapshot.params['id'];
    this.userService
      .updateUser(this.beneficiary_id, this.miFormulario.value)
      .subscribe((resp) => {
        alert('datos actualizados');
      });

    this.userService.getUser(this.beneficiary_id).subscribe((resp: any) => {
      this.miFormulario.controls.nombres.setValue(resp.result[0].nombres);
      this.miFormulario.controls.apellidos.setValue(resp.result[0].apellidos);
      this.miFormulario.controls.email.setValue(resp.result[0].email);
      this.miFormulario.controls.telefono.setValue(resp.result[0].telefono);
      this.user.push(resp.result[0].imgUrl);
    });
  }

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }
}
