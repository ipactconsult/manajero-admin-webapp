import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersThreeViewComponent } from './purchase-orders-three-view.component';

describe('PurchaseOrdersThreeViewComponent', () => {
  let component: PurchaseOrdersThreeViewComponent;
  let fixture: ComponentFixture<PurchaseOrdersThreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersThreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersThreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
