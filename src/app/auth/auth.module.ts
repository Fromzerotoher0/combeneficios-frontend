import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    authRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AuthModule {}
