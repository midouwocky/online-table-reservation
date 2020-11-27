import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../shared/models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(
    private http: HttpClient
  ) { }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>('/api/tables');
  }
}
