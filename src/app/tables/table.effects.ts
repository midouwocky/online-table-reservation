import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { getTablesFinished, getTablesStart } from './table.action';
import { TableService } from '../services/table.service';
import { errorOccurred } from '../services/error.action';
import { DomainHelperService } from '../services/domain-helper.service';


@Injectable({
    providedIn: 'root',
})
export class TablesEffects {

    constructor(
        private actions$: Actions,
        private tableService: TableService,
        private dh: DomainHelperService
    ) { }

    getTables$ = createEffect(() => this.actions$.pipe(
        ofType(getTablesStart),
        switchMap((action) => {
            return this.tableService.getTables()
                .pipe(
                    map(tables => {
                        let tablesArray = tables;
                        if (action.filter.range || action.filter.sits) {
                            tablesArray = this.dh.filterTables(tables, action.filter);
                        }
                        return getTablesFinished({ tables: tablesArray });
                    }),
                    catchError(err =>
                        of(errorOccurred({ errorMessage: err.message }))),
                );
        }),
    ));

}
