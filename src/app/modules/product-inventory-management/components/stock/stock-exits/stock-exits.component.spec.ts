import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExitsComponent } from './stock-exits.component';

describe('StockExitsComponent', () => {
  let component: StockExitsComponent;
  let fixture: ComponentFixture<StockExitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockExitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockExitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
