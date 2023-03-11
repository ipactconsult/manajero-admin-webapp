import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMovementsGridComponent } from './inventory-movements-grid.component';

describe('InventoryMovementsGridComponent', () => {
  let component: InventoryMovementsGridComponent;
  let fixture: ComponentFixture<InventoryMovementsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMovementsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMovementsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
