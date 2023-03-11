import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedDetailsEmployeeComponent } from './advanced-details-employee.component';

describe('AdvancedDetailsEmployeeComponent', () => {
  let component: AdvancedDetailsEmployeeComponent;
  let fixture: ComponentFixture<AdvancedDetailsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedDetailsEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedDetailsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
