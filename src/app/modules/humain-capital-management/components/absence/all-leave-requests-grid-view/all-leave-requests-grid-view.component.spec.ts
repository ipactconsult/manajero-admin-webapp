import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeaveRequestsGridViewComponent } from './all-leave-requests-grid-view.component';

describe('AllLeaveRequestsGridViewComponent', () => {
  let component: AllLeaveRequestsGridViewComponent;
  let fixture: ComponentFixture<AllLeaveRequestsGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLeaveRequestsGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeaveRequestsGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
