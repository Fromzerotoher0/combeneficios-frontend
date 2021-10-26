import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {}
  chat() {
    window.location.href = 'https://api.whatsapp.com/send?phone=573009125879';
  }
  correo() {
    this.router.navigateByUrl(`/contacto`);
  }

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }
}
