import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPrsComponent } from './grid-prs.component';

describe('GridPrsComponent', () => {
  let component: GridPrsComponent;
  let fixture: ComponentFixture<GridPrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridPrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
