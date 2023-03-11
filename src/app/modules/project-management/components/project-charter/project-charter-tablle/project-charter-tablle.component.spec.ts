import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterTablleComponent } from './project-charter-tablle.component';

describe('ProjectCharterTablleComponent', () => {
  let component: ProjectCharterTablleComponent;
  let fixture: ComponentFixture<ProjectCharterTablleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterTablleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterTablleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
