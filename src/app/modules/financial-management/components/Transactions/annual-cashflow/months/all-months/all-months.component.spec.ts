import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMonthsComponent } from './all-months.component';

describe('AllMonthsComponent', () => {
  let component: AllMonthsComponent;
  let fixture: ComponentFixture<AllMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
