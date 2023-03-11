import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSubDepartmentComponent } from './table-sub-department.component';

describe('TableSubDepartmentComponent', () => {
  let component: TableSubDepartmentComponent;
  let fixture: ComponentFixture<TableSubDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSubDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSubDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
