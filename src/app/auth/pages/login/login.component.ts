import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  //formulario de inicio de sesion
  miFormulario: FormGroup = this.fb.group({
    identificacion: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });

  getUserLocation() {
    let lat;
    let lng;
    let zoom;
    // get Users current position

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        zoom = 16;
        console.log('position', position);
        console.log(lat, lng);
      });
    } else {
      console.log('User not allowed');
    }
  }

  login() {
    //llamada al servicio de login
    this.authService.login(this.miFormulario.value).subscribe(
      (resp: Login) => {
        this.getUserLocation();
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
