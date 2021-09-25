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
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    console.log(this.miFormulario.value);
    this.authService.login(this.miFormulario.value).subscribe((resp: any) => {
      this.router.navigateByUrl(`/app/homePage`);
      localStorage.setItem('jwt', resp.token);
      console.log(resp);
    });
  }
}
