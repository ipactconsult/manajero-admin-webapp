import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesStepperComponent } from './activities-stepper.component';

describe('ActivitiesStepperComponent', () => {
  let component: ActivitiesStepperComponent;
  let fixture: ComponentFixture<ActivitiesStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
