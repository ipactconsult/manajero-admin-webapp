import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDataListComponent } from './invoice-data-list.component';

describe('InvoiceDataListComponent', () => {
  let component: InvoiceDataListComponent;
  let fixture: ComponentFixture<InvoiceDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
