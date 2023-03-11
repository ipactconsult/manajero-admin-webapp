import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuotationComponent } from './details-quotation.component';

describe('DetailsQuotationComponent', () => {
  let component: DetailsQuotationComponent;
  let fixture: ComponentFixture<DetailsQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
