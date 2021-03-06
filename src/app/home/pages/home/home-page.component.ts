import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { DoctorsService } from '../../../services/doctors.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  ciudades: any = [];
  rol: any;
  nombre: any;
  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private doctorService: DoctorsService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.nombre = token.nombres;
    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.ciudades = resp.result;
      console.log(this.ciudades);
    });
    this.doctorService.getDoctorsCity().subscribe((resp: any) => {
      this.ciudades = resp.result;
    });
    this.selected = token.ciudad;
  }
  ngOnInit(): void {}
  selected: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  servicios() {
    this.router.navigateByUrl('/medicos/servicios');
  }
}
