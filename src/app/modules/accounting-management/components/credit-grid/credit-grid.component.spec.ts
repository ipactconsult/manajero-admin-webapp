import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditGridComponent } from './credit-grid.component';

describe('CreditGridComponent', () => {
  let component: CreditGridComponent;
  let fixture: ComponentFixture<CreditGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
