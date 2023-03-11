import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadEvaluationComponent } from './keypad-evaluation.component';

describe('KeypadEvaluationComponent', () => {
  let component: KeypadEvaluationComponent;
  let fixture: ComponentFixture<KeypadEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
