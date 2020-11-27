import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/shared/models/table.model';

@Component({
  selector: 'app-tables-table',
  templateUrl: './tables-table.component.html',
  styleUrls: ['./tables-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesTableComponent implements OnInit {
  @Input()
  tables: Table[];
  constructor() { }

  ngOnInit(): void {
  }

}
