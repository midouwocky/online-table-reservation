import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TablesService } from 'src/app/services/tables.service';
import { Table } from 'src/app/shared/models/table.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit {
  tables$: Observable<Table[]>;

  constructor(
    private tableService: TablesService
  ) { }

  ngOnInit(): void {
    this.tables$ = this.tableService.getTables();
  }

}
