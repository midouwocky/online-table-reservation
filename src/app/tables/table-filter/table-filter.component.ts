import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DomainHelperService } from 'src/app/services/domain-helper.service';
import { TableFilter } from 'src/app/shared/models/table.model';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  time = { hour: 13, minute: 30 };

  startTime: string;
  endTime: string;

  startTimeControl: FormControl = new FormControl();
  endTimeControl: FormControl = new FormControl();
  sitsNumberControl: FormControl = new FormControl();
  intervalControl: FormControl = new FormControl(null);

  @Output()
  filterChange: EventEmitter<TableFilter> = new EventEmitter<TableFilter>();

  error: string;


  constructor(
    private dh: DomainHelperService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  refreshData = () => {
    const filter: TableFilter = {};
    if (this.intervalControl.value
      && this.startTimeControl.value
      && this.endTimeControl.value) {
      const startDate = moment(this.intervalControl.value.from);
      const endDate = moment(this.intervalControl.value.to ? this.intervalControl.value.to : this.intervalControl.value.from);

      startDate
        .add(this.dh.getHours(this.startTimeControl.value), 'hours')
        .add(this.dh.getMinutes(this.startTimeControl.value), 'minute');
      endDate
        .add(this.dh.getHours(this.endTimeControl.value), 'hours')
        .add(this.dh.getMinutes(this.endTimeControl.value), 'minute');

      if (endDate.isBefore(startDate)) {
        this.error = 'Date or time invalid';
        return null;
      }

      filter.range = {
        start: startDate.toDate().getTime(),
        end: endDate.toDate().getTime()
      };
    }

    if (this.sitsNumberControl.value) {
      filter.sits = this.sitsNumberControl.value;
    }

    this.filterChange.emit(filter);
  }

}
