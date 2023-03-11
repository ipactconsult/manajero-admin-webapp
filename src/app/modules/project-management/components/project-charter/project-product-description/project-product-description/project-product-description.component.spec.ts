import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProductDescriptionComponent } from './project-product-description.component';

describe('ProjectProductDescriptionComponent', () => {
  let component: ProjectProductDescriptionComponent;
  let fixture: ComponentFixture<ProjectProductDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProductDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProductDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
