import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEntriesGridComponent } from './stock-entries-grid.component';

describe('StockEntriesGridComponent', () => {
  let component: StockEntriesGridComponent;
  let fixture: ComponentFixture<StockEntriesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockEntriesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEntriesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
