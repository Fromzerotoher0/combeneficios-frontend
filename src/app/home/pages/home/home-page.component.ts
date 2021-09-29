import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  ciudades: any = [];
  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {
    this.authService.getDepartamentos().subscribe((resp: any) => {
      this.ciudades = resp.results;
      console.log(this.ciudades);
    });
  }
  ngOnInit(): void {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
  }
}
