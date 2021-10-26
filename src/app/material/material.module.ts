import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [],
  exports: [
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatPasswordStrengthModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class MaterialModule {}
