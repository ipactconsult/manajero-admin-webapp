import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadListEmployeesComponent } from './keypad-list-employees.component';

describe('KeypadListEmployeesComponent', () => {
  let component: KeypadListEmployeesComponent;
  let fixture: ComponentFixture<KeypadListEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadListEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadListEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
