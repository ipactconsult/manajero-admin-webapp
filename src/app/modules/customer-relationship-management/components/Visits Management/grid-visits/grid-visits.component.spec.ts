import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridVisitsComponent } from './grid-visits.component';

describe('GridVisitsComponent', () => {
  let component: GridVisitsComponent;
  let fixture: ComponentFixture<GridVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
