import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedStockMovementsListComponent } from './archived-stock-movements-list.component';

describe('ArchivedStockMovementsListComponent', () => {
  let component: ArchivedStockMovementsListComponent;
  let fixture: ComponentFixture<ArchivedStockMovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedStockMovementsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedStockMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
