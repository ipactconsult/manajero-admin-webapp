import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGoalComponent } from './project-goal.component';

describe('ProjectGoalComponent', () => {
  let component: ProjectGoalComponent;
  let fixture: ComponentFixture<ProjectGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
