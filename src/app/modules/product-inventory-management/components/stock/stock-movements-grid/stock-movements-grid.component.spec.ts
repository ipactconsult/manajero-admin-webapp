import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementsGridComponent } from './stock-movements-grid.component';

describe('StockMovementsGridComponent', () => {
  let component: StockMovementsGridComponent;
  let fixture: ComponentFixture<StockMovementsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockMovementsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMovementsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
