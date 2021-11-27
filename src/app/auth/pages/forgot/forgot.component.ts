import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  forgot() {
    console.log(this.emailFormControl.value);
    this.userService.forgotPassword(this.emailFormControl.value).subscribe(
      (resp) => {
        alert('contraseña enviada a su correo');
      },
      (err: any) => {
        alert(err.error.msg);
      }
    );
  }
}
