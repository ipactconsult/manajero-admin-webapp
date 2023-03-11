import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEntriesListComponent } from './stock-entries-list.component';

describe('StockEntriesListComponent', () => {
  let component: StockEntriesListComponent;
  let fixture: ComponentFixture<StockEntriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockEntriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
