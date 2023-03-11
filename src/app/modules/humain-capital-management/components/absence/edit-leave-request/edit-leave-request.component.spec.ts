import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveRequestComponent } from './edit-leave-request.component';

describe('EditLeaveRequestComponent', () => {
  let component: EditLeaveRequestComponent;
  let fixture: ComponentFixture<EditLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLeaveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
