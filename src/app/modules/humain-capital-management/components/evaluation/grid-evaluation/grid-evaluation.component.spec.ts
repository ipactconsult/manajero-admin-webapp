import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEvaluationComponent } from './grid-evaluation.component';

describe('GridEvaluationComponent', () => {
  let component: GridEvaluationComponent;
  let fixture: ComponentFixture<GridEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
