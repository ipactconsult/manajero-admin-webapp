import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCashflowComponent } from './daily-cashflow.component';

describe('DailyCashflowComponent', () => {
  let component: DailyCashflowComponent;
  let fixture: ComponentFixture<DailyCashflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyCashflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCashflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
