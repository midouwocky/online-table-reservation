import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { TableService } from 'src/app/services/table.service';
import { addReservationToTable, addReservationToTableFinished } from './reservation.action';


@Injectable({
    providedIn: 'root',
})
export class ReservationEffects {

    constructor(
        private actions$: Actions,
        private tableService: TableService
    ) { }

    addReservationToTable$ = createEffect(() => this.actions$.pipe(
        ofType(addReservationToTable),
        switchMap((action) => {
            const table = { ...action.table };
            const reservation = action.reservation;
            if (!table.reservations) {
                table.reservations = [reservation];
            } else {
                table.reservations = [...table.reservations, reservation];
            }
            return this.tableService.editTable(table).pipe(map(() => addReservationToTableFinished({ reservationAdded: reservation })));
        }),
    ));

}
