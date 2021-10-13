import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private doctorsService: DoctorsService) {}
  doctors: any;
  initDoctors: any;
  especializaciones: any;
  term: string = '';
  selectedBrand: any;

  ngOnInit(): void {
    this.doctorsService.getDoctors().subscribe((resp: any) => {
      this.doctors = resp.results;
      this.initDoctors = resp.results;
      console.log(this.doctors);
    });

    this.doctorsService.getEspecs().subscribe((resp: any) => {
      this.especializaciones = resp.results;
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
}
