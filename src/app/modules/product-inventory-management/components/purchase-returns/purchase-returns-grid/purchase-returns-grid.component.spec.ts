import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnsGridComponent } from './purchase-returns-grid.component';

describe('PurchaseReturnsGridComponent', () => {
  let component: PurchaseReturnsGridComponent;
  let fixture: ComponentFixture<PurchaseReturnsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReturnsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
