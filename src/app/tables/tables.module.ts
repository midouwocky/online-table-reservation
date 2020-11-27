import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TablesComponent } from './tables/tables.component';



@NgModule({
  declarations: [
    TablesComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    HttpClientModule
  ]
})
export class TablesModule { }
