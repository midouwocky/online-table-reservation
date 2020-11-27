import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TablesComponent } from './tables/tables.component';
import { StoreModule } from '@ngrx/store';
import { tablesReducer } from './table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TablesEffects } from './table.effects';



@NgModule({
  declarations: [
    TablesComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('tables', tablesReducer),
    EffectsModule.forFeature([ TablesEffects ])
  ]
})
export class TablesModule { }
