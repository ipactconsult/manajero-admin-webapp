import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadTrainingsComponent } from './keypad-trainings.component';

describe('KeypadTrainingsComponent', () => {
  let component: KeypadTrainingsComponent;
  let fixture: ComponentFixture<KeypadTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadTrainingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
