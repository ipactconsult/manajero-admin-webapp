import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderEventMarketingComponent } from './calender-event-marketing.component';

describe('CalenderEventMarketingComponent', () => {
  let component: CalenderEventMarketingComponent;
  let fixture: ComponentFixture<CalenderEventMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderEventMarketingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderEventMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
