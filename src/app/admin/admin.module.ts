import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RequestComponent } from './request/request.component';
import { StudyRequestComponent } from './study-request/study-request.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequestComponent, StudyRequestComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
