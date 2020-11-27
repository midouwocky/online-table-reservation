import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reservationReducer } from './reservation.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReservationEffects } from './reservatioin.effects';



@NgModule({
  declarations: [ReservationFormComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    NgxMaterialTimepickerModule,
    NgbAlertModule,
    StoreModule.forFeature('reservation', reservationReducer),
    EffectsModule.forFeature([ ReservationEffects ]),
  ]
})
export class ReservationModule { }
