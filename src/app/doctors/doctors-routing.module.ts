import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ListComponent } from './list/list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DoctorGuard } from '../guards/doctor.guard';
import { RequestComponent } from './request/request.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { HistorialComponent } from './historial/historial.component';
import { AppointmentComponent } from './appointment/appointment.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'solicitud',
        component: AddComponent,
      },
      {
        path: 'servicios',
        component: ListComponent,
      },
      {
        path: 'estudio',
        component: RequestComponent,
        canActivate: [DoctorGuard],
        canLoad: [DoctorGuard],
      },
      {
        path: 'agenda',
        component: ScheduleComponent,
        canActivate: [DoctorGuard],
        canLoad: [DoctorGuard],
      },
      {
        path: 'agendaMedico',
        component: ScheduleListComponent,
        canActivate: [DoctorGuard],
        canLoad: [DoctorGuard],
      },
      {
        path: 'agendaUsuario',
        component: AppointmentsListComponent,
      },
      {
        path: 'historial',
        component: HistorialComponent,
      },
      { path: 'cita/:id', component: AppointmentComponent },
      { path: ':id', component: DoctorComponent },
      { path: 'agenda/:id', component: AppointmentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
