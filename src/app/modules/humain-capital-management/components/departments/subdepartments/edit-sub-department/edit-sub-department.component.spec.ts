import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubDepartmentComponent } from './edit-sub-department.component';

describe('EditSubDepartmentComponent', () => {
  let component: EditSubDepartmentComponent;
  let fixture: ComponentFixture<EditSubDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
