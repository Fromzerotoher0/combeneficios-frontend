import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private doctorsService: DoctorsService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  doctors: any;
  initDoctors: any;
  especializaciones: any;
  term: string = '';
  selectedBrand: any;

  ngOnInit(): void {
    this.doctorsService.getDoctors().subscribe((resp: any) => {
      this.doctors = resp.result;
      this.initDoctors = resp.result;
      console.log(this.doctors);
    });

    this.doctorsService.getEspecs().subscribe((resp: any) => {
      this.especializaciones = resp.result;
    });
  }

  valueSelected() {
    this.doctors = this.initDoctors;
    this.doctors = this.doctors.filter((doctor: any) => {
      if (this.selectedBrand == 'all') {
        return doctor;
      }
      return doctor.descripcion === this.selectedBrand;
    });
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }
}
