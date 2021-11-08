import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  ciudades: any = [];
  rol: any;
  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.ciudades = resp.result;
      console.log(this.ciudades);
    });
  }
  ngOnInit(): void {}

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
