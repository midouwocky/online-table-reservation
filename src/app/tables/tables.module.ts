import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TablesComponent } from './tables/tables.component';
import { StoreModule } from '@ngrx/store';
import { tablesReducer } from './table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TablesEffects } from './table.effects';
import { TablesTableComponent } from './tables-table/tables-table.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';



@NgModule({
  declarations: [
    TablesComponent,
    TablesTableComponent,
    TableFilterComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('tables', tablesReducer),
    EffectsModule.forFeature([ TablesEffects ]),
    NgbTimepickerModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot()
  ]
})
export class TablesModule { }
