import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'homePage',
        component: HomePageComponent,
      },
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
