import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from '../../interfaces/doctor.interface';

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
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.doctorsService.getDoctors().subscribe((resp: any) => {
      this.initDoctors = resp.result;
      this.doctors = resp.result;
      this.citySelected(token.ciudad);
      console.log(resp.result);
    });
    this.doctorsService.getEspecs().subscribe((resp: any) => {
      this.especializaciones = resp.result;
    });
    this.doctorsService.getDoctorsCity().subscribe((resp: any) => {
      this.ciudades = resp.result;
    });
  }
  doctors: any;
  initDoctors: Doctor = {};
  especializaciones: any;
  term: string = '';
  selectedBrand: any;
  rol: any;
  ciudades: any;
  cityDoctors: any = [];
  token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);

  ngOnInit(): void {}

  selected = this.token.ciudad;

  valueSelected() {
    this.doctors = this.cityDoctors;
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

  citySelected(ciudad: any) {
    this.doctors = this.initDoctors;
    console.log('cambio');

    this.doctors = this.doctors.filter((doctor: any) => {
      if (doctor.ciudad == ciudad) {
        return doctor;
      }
      return '';
    });
    this.cityDoctors = this.doctors;
  }
}
