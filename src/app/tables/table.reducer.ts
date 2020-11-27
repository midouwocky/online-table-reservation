import { createReducer, on } from '@ngrx/store';
import { getTablesFinished } from './table.action';
import { TablesState } from './tables-state';


export const tablesReducer = createReducer<TablesState>(
  { tables: [] },
  on(getTablesFinished, (state, action) => ({
    ...state,
    tables: action.tables
  }))
);
