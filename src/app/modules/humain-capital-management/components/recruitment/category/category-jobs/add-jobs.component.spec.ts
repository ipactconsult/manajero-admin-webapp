import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryJobsComponent } from './category-jobs.component';

describe('CategoryJobsComponent', () => {
  let component: CategoryJobsComponent;
  let fixture: ComponentFixture<CategoryJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
