import { createAction, props } from '@ngrx/store';
import { Table, TableFilter } from '../shared/models/table.model';

export const getTablesStart = createAction('[Table] Get Tables Started');
export const getTablesWithFilterStart = createAction('[Table] Get Tables With Filter Started',
    props<{ filter?: TableFilter}>());
export const getTablesFinished = createAction('[Table] Get Tables Finished', props<{ tables: Table[] }>());
