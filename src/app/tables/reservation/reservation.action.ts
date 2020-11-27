import { createAction, props } from '@ngrx/store';
import { Reservation, Table } from 'src/app/shared/models/table.model';

export const addReservationToTable = createAction('addReservationToTable',
    props<{ table: Table, reservation: Reservation }>());
export const addReservationToTableFinished = createAction('addReservationToTableFinished',
props<{ reservationAdded: Reservation }>());
export const cancelReservation = createAction('cancelReservation');
export const enterAddReservation = createAction('enterAddReservation',
    props<{ table: Table }>());

