import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubListDepartmentComponent } from './sub-list-department.component';

describe('SubListDepartmentComponent', () => {
  let component: SubListDepartmentComponent;
  let fixture: ComponentFixture<SubListDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubListDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubListDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
