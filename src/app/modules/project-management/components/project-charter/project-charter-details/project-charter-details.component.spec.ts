import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterDetailsComponent } from './project-charter-details.component';

describe('ProjectCharterDetailsComponent', () => {
  let component: ProjectCharterDetailsComponent;
  let fixture: ComponentFixture<ProjectCharterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
