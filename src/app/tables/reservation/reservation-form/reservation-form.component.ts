import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table } from 'src/app/shared/models/table.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationFormComponent implements OnInit {

  table: Table;

  constructor() {
    this.table = window.history.state.table;
    if (!this.table) {
      window.history.back();
    }
   }

  ngOnInit(): void {
    
  }

}
