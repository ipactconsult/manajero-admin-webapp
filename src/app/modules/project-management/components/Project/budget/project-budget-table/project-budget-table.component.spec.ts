import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetTableComponent } from './project-budget-table.component';

describe('ProjectBudgetTableComponent', () => {
  let component: ProjectBudgetTableComponent;
  let fixture: ComponentFixture<ProjectBudgetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBudgetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBudgetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
