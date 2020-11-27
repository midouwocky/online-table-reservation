import { createReducer, on } from '@ngrx/store';
import { ReservationState } from './reservation-state';
import { addReservationToTable, addReservationToTableFinished, cancelReservation, enterAddReservation } from './reservation.action';


export const reservationReducer = createReducer<ReservationState>(
  { table: null, reservation: null },
  on(addReservationToTable, (state, action) => ({
    ...state,
    table: action.table,
    reservation: action.reservation,
    reservationAdded: null,
  })),
  on(addReservationToTableFinished, (state, action) => ({
    ...state,
    table: null,
    reservation: null,
    reservationAdded: action.reservationAdded
  })),
  on(enterAddReservation, (state, action) => ({
    ...state,
    table: action.table,
    reservation: null
  })),
  on(cancelReservation, (state, action) => ({
    ...state,
    table: null,
    reservation: null,
    reservationAdded: null
  }))
);
