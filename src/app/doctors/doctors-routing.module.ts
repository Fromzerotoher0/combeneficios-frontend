import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ListComponent } from './list/list.component';
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
      { path: ':id', component: DoctorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
