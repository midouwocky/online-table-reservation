import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';
import { getTablesFinished, getTablesStart } from './table.action';
import { TableService } from '../services/table.service';
import { errorOccurred } from '../services/error.action';


@Injectable({
  providedIn: 'root',
})
export class TablesEffects {

  constructor(
    private actions$: Actions,
    private tableService: TableService
  ) { }

  getTables$ = createEffect(() => this.actions$.pipe(
    ofType(getTablesStart),
    switchMap(() => {
      return this.tableService.getTables()
        .pipe(
          map(tables =>
            getTablesFinished({ tables })),
          catchError(err =>
              of(errorOccurred({ errorMessage: err.message }))),
        );
    }),
  ));

}
