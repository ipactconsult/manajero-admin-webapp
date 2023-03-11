import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeaveRequestsTableViewComponent } from './all-leave-requests-table-view.component';

describe('AllLeaveRequestsTableViewComponent', () => {
  let component: AllLeaveRequestsTableViewComponent;
  let fixture: ComponentFixture<AllLeaveRequestsTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLeaveRequestsTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeaveRequestsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
