import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { StudyRequestComponent } from './study-request/study-request.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'solicitudes',
        component: RequestComponent,
      },
      { path: 'solicitudEstudio', component: StudyRequestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
