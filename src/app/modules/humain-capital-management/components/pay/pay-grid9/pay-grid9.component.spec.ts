import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGrid9Component } from './pay-grid9.component';

describe('PayGrid9Component', () => {
  let component: PayGrid9Component;
  let fixture: ComponentFixture<PayGrid9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayGrid9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGrid9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
