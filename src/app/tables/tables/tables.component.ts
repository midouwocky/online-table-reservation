import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TableService } from 'src/app/services/table.service';
import { Reservation, Table, TableFilter } from 'src/app/shared/models/table.model';
import { getTablesStart, getTablesWithFilterStart } from '../table.action';
import { TablesState } from '../tables-state';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit {
  tables$: Observable<Table[]>;
  reservation$: Observable<Reservation>;
  errorMessage$: Observable<string>;

  filter: TableFilter = {};

  constructor(
    private store: Store<{ tables: TablesState }>
  ) { }

  ngOnInit(): void {
    this.tables$ = this.store.pipe(select((state: any) => state.tables.tables));
    this.reservation$ = this.store.pipe(select((state: any) => {
      if (state.reservation && state.reservation.reservationAdded) {
        return state.reservation.reservationAdded;
      }
    }));
    this.getTables();
  }

  getTables = () => {
    this.store.dispatch(getTablesStart());
  }

  getTablesWithFilter = () => {
    this.store.dispatch(getTablesWithFilterStart({ filter: this.filter }));
  }

  onFilterChange = (filter: TableFilter) => {
    this.filter = filter;
    if (filter === {}) {
      this.getTables();
    } else {
      this.getTablesWithFilter();
    }
  }
}
