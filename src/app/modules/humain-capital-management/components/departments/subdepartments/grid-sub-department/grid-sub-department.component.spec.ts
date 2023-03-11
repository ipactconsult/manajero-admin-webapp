import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSubDepartmentComponent } from './grid-sub-department.component';

describe('GridSubDepartmentComponent', () => {
  let component: GridSubDepartmentComponent;
  let fixture: ComponentFixture<GridSubDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSubDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSubDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
