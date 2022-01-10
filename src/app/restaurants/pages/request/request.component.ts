import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../../services/authentication.service';
import { RestaurantService } from '../../../services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authService: AuthenticationService,
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.departamentos = resp.result;
    });
  }

  // request form
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    especialidad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
  });

  rol: any;
  ciudades: any;
  departamentos: any;

  cargarCiudades(departamento: any) {
    console.log(departamento);

    this.authService.cargarCiudades(departamento).subscribe((resp: any) => {
      this.ciudades = resp.result;
      console.log(this.ciudades);
    });
  }

  ngOnInit(): void {}

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  servicios() {
    this.router.navigateByUrl('/medicos/servicios');
  }

  registro() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));
    this.restaurantService
      .register(token.id, this.miFormulario.value)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire({
          title: 'solicitud enviada',
          text: '',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      });
  }
}
