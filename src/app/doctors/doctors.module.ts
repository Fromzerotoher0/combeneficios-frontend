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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EspecializacionesPipe } from '../pipes/especializaciones.pipe';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { CalificacionPipe } from '../pipes/calificacion.pipe';
import { HistorialComponent } from './historial/historial.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentComponent } from './appointment/appointment.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

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
    AppointmentsListComponent,
    CalificacionPipe,
    HistorialComponent,
    AppointmentComponent,
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
    NgbRatingModule,
    ModalModule,
  ],
  providers: [DatePipe, BsModalService],
})
export class DoctorsModule {}
