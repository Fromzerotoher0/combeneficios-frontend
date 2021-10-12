import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ListComponent } from './list/list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DoctorGuard } from '../guards/doctor.guard';
import { RequestComponent } from './request/request.component';
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
      { path: ':id', component: DoctorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
