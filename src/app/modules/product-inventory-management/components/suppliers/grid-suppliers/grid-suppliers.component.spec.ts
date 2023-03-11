import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSuppliersComponent } from './grid-suppliers.component';

describe('GridSuppliersComponent', () => {
  let component: GridSuppliersComponent;
  let fixture: ComponentFixture<GridSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
