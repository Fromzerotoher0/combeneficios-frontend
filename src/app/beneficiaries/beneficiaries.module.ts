import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { ParentescoPipe } from '../pipes/parentesco.pipe';
import { CredentialComponent } from './credential/credential.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InformationComponent } from './information/information.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ListComponent,
    ParentescoPipe,
    CredentialComponent,
    AddComponent,
    InformationComponent,
  ],
  imports: [
    CommonModule,
    BeneficiariesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class BeneficiariesModule {}
