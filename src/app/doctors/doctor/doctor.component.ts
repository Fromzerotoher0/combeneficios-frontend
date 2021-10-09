import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorsService
  ) {}
  doctor_id: any;
  doctor: any;
  pregrade: any;
  especialization: any;
  ngOnInit(): void {
    this.doctor_id = this.activatedRoute.snapshot.params['id'];
    this.doctorService.getDoctor(this.doctor_id).subscribe((resp: any) => {
      this.doctor = resp.results;
      console.log(this.doctor);
    });

    this.doctorService.getPregrade(this.doctor_id).subscribe((resp: any) => {
      this.pregrade = resp.results;
    });

    this.doctorService
      .getEspecialization(this.doctor_id)
      .subscribe((resp: any) => {
        this.especialization = resp.results;
      });
  }
}
