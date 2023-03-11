import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRiskComponent } from './sales-risk.component';

describe('SalesRiskComponent', () => {
  let component: SalesRiskComponent;
  let fixture: ComponentFixture<SalesRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesRiskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
