import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoiceItemsComponent } from './add-invoice-items.component';

describe('AddInvoiceItemsComponent', () => {
  let component: AddInvoiceItemsComponent;
  let fixture: ComponentFixture<AddInvoiceItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvoiceItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvoiceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
