import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SupportComponent } from './pages/support/support.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'homePage',
        component: HomePageComponent,
      },
      {
        path: 'contacto',
        component: ContactComponent,
      },
      {
        path: 'soporte',
        component: SupportComponent,
      },
      { path: 'perfil', component: ProfileComponent },
      {
        path: '**',
        redirectTo: 'homePage',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class homeRoutingModule {}
