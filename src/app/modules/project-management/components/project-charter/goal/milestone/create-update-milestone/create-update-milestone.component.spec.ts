import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMilestoneComponent } from './create-update-milestone.component';

describe('CreateUpdateMilestoneComponent', () => {
  let component: CreateUpdateMilestoneComponent;
  let fixture: ComponentFixture<CreateUpdateMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
