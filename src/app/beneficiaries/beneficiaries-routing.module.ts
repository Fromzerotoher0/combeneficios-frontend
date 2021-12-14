import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { CredentialComponent } from './credential/credential.component';
import { InformationComponent } from './information/information.component';
import { ListComponent } from './list/list.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lista',
        component: ListComponent,
      },
      {
        path: 'tarjeta',
        component: CredentialComponent,
      },
      {
        path: 'agregar',
        component: AddComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      { path: ':id', component: InformationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiariesRoutingModule {}
