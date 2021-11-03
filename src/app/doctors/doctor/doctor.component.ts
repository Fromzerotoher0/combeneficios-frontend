import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorsService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  doctor_id: any;
  doctor: any;
  doctorData: any;
  pregrade: any;
  especialization: any;
  ngOnInit(): void {
    this.doctor_id = this.activatedRoute.snapshot.params['id'];
    this.doctorService.getDoctor(this.doctor_id).subscribe((resp: any) => {
      this.doctor = resp.result;
      console.log(this.doctor);
    });

    this.doctorService.getPregrade(this.doctor_id).subscribe((resp: any) => {
      this.pregrade = resp.result;
    });

    this.doctorService
      .getEspecialization(this.doctor_id)
      .subscribe((resp: any) => {
        this.especialization = resp.result;
      });
  }

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  agenda() {
    this.doctor_id = this.activatedRoute.snapshot.params['id'];
    console.log(this.doctor_id);
    this.router.navigateByUrl(`/medicos/agenda/${this.doctor_id}`);
  }
}
