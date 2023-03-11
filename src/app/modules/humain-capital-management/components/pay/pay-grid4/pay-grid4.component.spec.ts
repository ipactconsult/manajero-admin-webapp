import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGrid4Component } from './pay-grid4.component';

describe('PayGrid4Component', () => {
  let component: PayGrid4Component;
  let fixture: ComponentFixture<PayGrid4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayGrid4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGrid4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
