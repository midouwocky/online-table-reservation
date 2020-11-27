import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Table } from 'src/app/shared/models/table.model';
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

  constructor(
    private store: Store<{ tables: TablesState }>,
  ) { }

  ngOnInit(): void {
    this.tables$ = this.store.pipe(select((state: any) => state.tables.tables));
    this.store.pipe(select((state: any) => state.tables.tables)).subscribe(res => {
      console.log(res);
    });
    this.store.dispatch(getTablesStart());
  }

}
