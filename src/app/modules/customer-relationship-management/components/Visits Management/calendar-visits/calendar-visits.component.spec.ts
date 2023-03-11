import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarVisitsComponent } from './calendar-visits.component';

describe('CalendarVisitsComponent', () => {
  let component: CalendarVisitsComponent;
  let fixture: ComponentFixture<CalendarVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
