import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesHistoryComponent } from './employees-history.component';

describe('EmployeesHistoryComponent', () => {
  let component: EmployeesHistoryComponent;
  let fixture: ComponentFixture<EmployeesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
