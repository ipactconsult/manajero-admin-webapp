import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilityCustomerTableComponent } from './responsibility-customer-table.component';

describe('ResponsibilityCustomerTableComponent', () => {
  let component: ResponsibilityCustomerTableComponent;
  let fixture: ComponentFixture<ResponsibilityCustomerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsibilityCustomerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibilityCustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
