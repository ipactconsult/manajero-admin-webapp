import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryUnitsTableComponent } from './delivery-units-table.component';

describe('DeliveryUnitsTableComponent', () => {
  let component: DeliveryUnitsTableComponent;
  let fixture: ComponentFixture<DeliveryUnitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryUnitsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryUnitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
