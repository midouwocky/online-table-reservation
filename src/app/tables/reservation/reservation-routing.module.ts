import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';


const routes: Routes = [
  {
    path: '',
    component: ReservationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
