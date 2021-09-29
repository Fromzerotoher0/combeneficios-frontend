import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {}
  miFormulario: FormGroup = this.fb.group({
    identificacion: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    this.authService.login(this.miFormulario.value).subscribe(
      (resp: any) => {
        if (resp.error === true) {
          alert('usuario y/o contraseña incorrectos');
        } else {
          this.router.navigateByUrl(`/app/homePage`);
          localStorage.setItem('jwt', resp.token);
        }
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }
}
