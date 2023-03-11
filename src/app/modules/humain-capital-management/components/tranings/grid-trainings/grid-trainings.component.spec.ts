import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTrainingsComponent } from './grid-trainings.component';

describe('GridTrainingsComponent', () => {
  let component: GridTrainingsComponent;
  let fixture: ComponentFixture<GridTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridTrainingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
