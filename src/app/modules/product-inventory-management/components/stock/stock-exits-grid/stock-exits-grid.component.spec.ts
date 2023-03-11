import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExitsGridComponent } from './stock-exits-grid.component';

describe('StockExitsGridComponent', () => {
  let component: StockExitsGridComponent;
  let fixture: ComponentFixture<StockExitsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockExitsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockExitsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
