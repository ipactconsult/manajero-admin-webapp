import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPurchaseOrdersListComponent } from './archived-purchase-orders-list.component';

describe('ArchivedPurchaseOrdersListComponent', () => {
  let component: ArchivedPurchaseOrdersListComponent;
  let fixture: ComponentFixture<ArchivedPurchaseOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPurchaseOrdersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPurchaseOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
