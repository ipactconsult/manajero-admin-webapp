import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixStockComponent } from './fix-stock.component';

describe('FixStockComponent', () => {
  let component: FixStockComponent;
  let fixture: ComponentFixture<FixStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
