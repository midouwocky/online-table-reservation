import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TableService } from 'src/app/services/table.service';
import { Table, TableFilter } from 'src/app/shared/models/table.model';
import { getTablesStart } from '../table.action';
import { TablesState } from '../tables-state';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit {
  tables$: Observable<Table[]>;
  errorMessage$: Observable<string>;

  filter: TableFilter = {};

  constructor(
    private store: Store<{ tables: TablesState }>
  ) { }

  ngOnInit(): void {
    this.tables$ = this.store.pipe(select((state: any) => state.tables.tables));
    this.getTables();
  }

  getTables() {
    this.store.dispatch(getTablesStart({ filter: this.filter }));
  }

  onFilterChange(filter: TableFilter) {
    this.filter = filter;
    this.getTables();
  }
}
