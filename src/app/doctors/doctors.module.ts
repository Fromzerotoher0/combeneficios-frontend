import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { RequestComponent } from './request/request.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EspecializacionesPipe } from '../pipes/especializaciones.pipe';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
@NgModule({
  declarations: [
    ListComponent,
    DoctorComponent,
    AddComponent,
    ScheduleComponent,
    RequestComponent,
    EspecializacionesPipe,
    AppointmentsComponent,
    ScheduleListComponent,
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [DatePipe],
})
export class DoctorsModule {}
