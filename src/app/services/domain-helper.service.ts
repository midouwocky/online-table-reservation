import { Injectable } from '@angular/core';
import { Table, TableFilter } from '../shared/models/table.model';

@Injectable({
  providedIn: 'root'
})
export class DomainHelperService {

  constructor() { }

  filterTables(tables: Table[], filter: TableFilter): Table[] {
    if (filter.range) {
      tables = tables.filter(table => {
        if (!table.reservations) {
          return false;
        }
        const res = table.reservations.filter(reservation =>
          // if reservation in the range
          reservation.start >= filter.range.start && reservation.start <= filter.range.end
        );
        return res.length > 0;
      });
    }

    if (filter.sits) {
      tables = tables.filter(table => table.sits === filter.sits);
    }
    return tables;
  }

  /**
   * get Hours from a time string
   * @param time time string
   */
  getHours(time: string): number {
    return +time.substring(0, 2);
  }

  /**
   * get Minutes from a time string
   * @param time time string
   */
  getMinutes(time: string): number {
    return +time.substring(3, 5);
  }

}
