import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesTableComponent } from './tables-table.component';

describe('TablesTableComponent', () => {
  let component: TablesTableComponent;
  let fixture: ComponentFixture<TablesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
