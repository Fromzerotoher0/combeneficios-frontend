import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css'],
})
export class CredentialComponent implements OnInit {
  user: any = [];
  rol: any;
  constructor(
    private jwtHelper: JwtHelperService,
    private userService: UserService,
    private router: Router
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.userService.getUser(token.id).subscribe((resp: any) => {
      this.user.push(resp.result[0]);
      console.log(this.user);
    });
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  ngOnInit(): void {}
}
