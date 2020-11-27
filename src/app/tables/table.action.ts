import { createAction, props } from '@ngrx/store';
import { Table } from '../shared/models/table.model';

export const getTablesStart = createAction('[Table] Get Tables Started');
export const getTablesFinished = createAction('[Table] Get Tables Finished', props<{tables: Table[]}>());
