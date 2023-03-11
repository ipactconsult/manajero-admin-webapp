import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGeneraleInfoComponent } from './project-generale-info.component';

describe('ProjectGeneraleInfoComponent', () => {
  let component: ProjectGeneraleInfoComponent;
  let fixture: ComponentFixture<ProjectGeneraleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGeneraleInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGeneraleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
