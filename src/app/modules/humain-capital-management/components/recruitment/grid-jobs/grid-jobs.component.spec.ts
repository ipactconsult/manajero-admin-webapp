import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridJobsComponent } from './grid-jobs.component';

describe('GridJobsComponent', () => {
  let component: GridJobsComponent;
  let fixture: ComponentFixture<GridJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
