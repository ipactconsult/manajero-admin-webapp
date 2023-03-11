import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDepartmentComponent } from './grid-department.component';

describe('GridDepartmentComponent', () => {
  let component: GridDepartmentComponent;
  let fixture: ComponentFixture<GridDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
