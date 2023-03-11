import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeaveRequestsKeypadViewComponent } from './all-leave-requests-keypad-view.component';

describe('AllLeaveRequestsKeypadViewComponent', () => {
  let component: AllLeaveRequestsKeypadViewComponent;
  let fixture: ComponentFixture<AllLeaveRequestsKeypadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLeaveRequestsKeypadViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeaveRequestsKeypadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
