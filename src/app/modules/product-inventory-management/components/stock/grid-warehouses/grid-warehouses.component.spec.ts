import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWarehousesComponent } from './grid-warehouses.component';

describe('GridWarehousesComponent', () => {
  let component: GridWarehousesComponent;
  let fixture: ComponentFixture<GridWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridWarehousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
