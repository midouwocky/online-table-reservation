import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables/tables.component';


const routes: Routes = [
  {
    path: '',
    component: TablesComponent
  },
  {
    path: 'book-table',
    loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
