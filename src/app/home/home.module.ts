import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { homeRoutingModule } from './home-routing.module';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './pages/support/support.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CredentialComponent } from './pages/credential/credential.component';
import { BeneficiariesComponent } from './pages/beneficiaries/beneficiaries.component';
import { ParentescoPipe } from '../pipes/parentesco.pipe';
import { MedicServicesComponent } from './pages/medic-services/medic-services.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ContactComponent,
    SupportComponent,
    ProfileComponent,
    CredentialComponent,
    BeneficiariesComponent,
    ParentescoPipe,
    MedicServicesComponent,
  ],
  imports: [CommonModule, homeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
