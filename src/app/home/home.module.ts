import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { homeRoutingModule } from './home-routing.module';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './pages/support/support.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MedicServicesComponent } from './pages/medic-services/medic-services.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ContactComponent,
    SupportComponent,
    ProfileComponent,
    MedicServicesComponent,
  ],
  imports: [CommonModule, homeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
