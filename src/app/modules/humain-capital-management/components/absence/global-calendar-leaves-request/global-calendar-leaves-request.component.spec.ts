import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCalendarLeavesRequestComponent } from './global-calendar-leaves-request.component';

describe('GlobalCalendarLeavesRequestComponent', () => {
  let component: GlobalCalendarLeavesRequestComponent;
  let fixture: ComponentFixture<GlobalCalendarLeavesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalCalendarLeavesRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCalendarLeavesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
