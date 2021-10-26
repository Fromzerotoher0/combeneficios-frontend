import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { homeRoutingModule } from './home-routing.module';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './pages/support/support.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MaterialModule } from '../material/material.module';
import { BeneficiariesRoutingModule } from '../beneficiaries/beneficiaries-routing.module';

@NgModule({
  declarations: [
    HomePageComponent,
    ContactComponent,
    SupportComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    homeRoutingModule,
    BeneficiariesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class HomeModule {}
