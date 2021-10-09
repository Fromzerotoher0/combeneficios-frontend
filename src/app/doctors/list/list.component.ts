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
  ngOnInit(): void {
    this.doctorsService.getDoctors().subscribe((resp: any) => {
      this.doctors = resp.results;
      console.log(this.doctors);
    });
  }
}
