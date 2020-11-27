import {Reservation, Table } from 'src/app/shared/models/table.model';

export interface ReservationState {
    table: Table;
    reservation: Reservation;
    reservationAdded?: Reservation;
}
