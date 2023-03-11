import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProjectGoalComponent } from './create-update-project-goal.component';

describe('CreateUpdateProjectGoalComponent', () => {
  let component: CreateUpdateProjectGoalComponent;
  let fixture: ComponentFixture<CreateUpdateProjectGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateProjectGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateProjectGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
