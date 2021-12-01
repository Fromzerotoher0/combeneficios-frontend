import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  forgot() {
    console.log(this.emailFormControl.value);
    this.userService.forgotPassword(this.emailFormControl.value).subscribe(
      (resp: any) => {
        alert(resp.result);
        this.router.navigateByUrl(`/auth/login`);
      },
      (err: any) => {
        alert(err.error.msg);
      }
    );
  }
}
