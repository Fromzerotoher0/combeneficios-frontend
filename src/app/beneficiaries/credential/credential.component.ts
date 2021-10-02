import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css'],
})
export class CredentialComponent implements OnInit {
  user: any = [];
  constructor(
    private jwtHelper: JwtHelperService,
    private userService: UserService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.userService.getUser(token.id).subscribe((resp: any) => {
      this.user.push(resp.results[0]);
      console.log(this.user);
    });
  }

  ngOnInit(): void {}
}
