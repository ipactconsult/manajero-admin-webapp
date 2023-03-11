import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpActionPlanComponent } from './help-action-plan.component';

describe('HelpActionPlanComponent', () => {
  let component: HelpActionPlanComponent;
  let fixture: ComponentFixture<HelpActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
