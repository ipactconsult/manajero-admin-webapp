import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridApplicationsComponent } from './grid-applications.component';

describe('GridApplicationsComponent', () => {
  let component: GridApplicationsComponent;
  let fixture: ComponentFixture<GridApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
