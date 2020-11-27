import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../shared/models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {


  constructor(
    private http: HttpClient
  ) { }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>('/api/tables');
  }

  addTable(table: Table): Observable<Table> {
    return this.http.post<Table>('/api/tables', table);
  }

  editTable(table: Table): Observable<Table> {
    return this.http.put<Table>(`/api/tables/${table.id}`, table);
  }

}
