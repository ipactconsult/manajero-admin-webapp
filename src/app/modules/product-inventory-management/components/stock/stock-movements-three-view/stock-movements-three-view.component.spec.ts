import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementsThreeViewComponent } from './stock-movements-three-view.component';

describe('StockMovementsThreeViewComponent', () => {
  let component: StockMovementsThreeViewComponent;
  let fixture: ComponentFixture<StockMovementsThreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockMovementsThreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMovementsThreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
