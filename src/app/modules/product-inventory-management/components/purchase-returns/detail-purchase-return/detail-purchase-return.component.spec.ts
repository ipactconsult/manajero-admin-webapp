import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPurchaseReturnComponent } from './detail-purchase-return.component';

describe('DetailPurchaseReturnComponent', () => {
  let component: DetailPurchaseReturnComponent;
  let fixture: ComponentFixture<DetailPurchaseReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPurchaseReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
