import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedStockEntriesListComponent } from './archived-stock-entries-list.component';

describe('ArchivedStockEntriesListComponent', () => {
  let component: ArchivedStockEntriesListComponent;
  let fixture: ComponentFixture<ArchivedStockEntriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedStockEntriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedStockEntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
