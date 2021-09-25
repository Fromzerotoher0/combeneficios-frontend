import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { homeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, homeRoutingModule],
})
export class HomeModule {}
