import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresponsibilityCustomerComponent } from './addresponsibility-customer.component';

describe('AddresponsibilityCustomerComponent', () => {
  let component: AddresponsibilityCustomerComponent;
  let fixture: ComponentFixture<AddresponsibilityCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresponsibilityCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresponsibilityCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
