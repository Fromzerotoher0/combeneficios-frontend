import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  user: any = [];
  beneficiaries: any = [];
  constructor(
    private jwtHelper: JwtHelperService,
    private userService: UserService,
    private router: Router
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);

    this.userService.getBeneficiaries(token.id).subscribe((resp: any) => {
      this.beneficiaries = resp.results;
      console.log(this.beneficiaries);
    });
  }

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  ngOnInit(): void {}
}
