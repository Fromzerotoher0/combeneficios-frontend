import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, DoctorComponent, AddComponent],
  imports: [CommonModule, DoctorsRoutingModule, ReactiveFormsModule],
})
export class DoctorsModule {}
