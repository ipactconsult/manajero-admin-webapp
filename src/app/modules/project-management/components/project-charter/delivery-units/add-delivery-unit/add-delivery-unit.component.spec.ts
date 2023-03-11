import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryUnitComponent } from './add-delivery-unit.component';

describe('AddDeliveryUnitComponent', () => {
  let component: AddDeliveryUnitComponent;
  let fixture: ComponentFixture<AddDeliveryUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeliveryUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliveryUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
