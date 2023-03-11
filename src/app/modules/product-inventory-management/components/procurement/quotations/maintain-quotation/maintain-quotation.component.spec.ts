import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainQuotationComponent } from './maintain-quotation.component';

describe('MaintainQuotationComponent', () => {
  let component: MaintainQuotationComponent;
  let fixture: ComponentFixture<MaintainQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
