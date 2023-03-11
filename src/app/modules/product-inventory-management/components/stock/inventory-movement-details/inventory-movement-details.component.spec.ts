import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMovementDetailsComponent } from './inventory-movement-details.component';

describe('InventoryMovementDetailsComponent', () => {
  let component: InventoryMovementDetailsComponent;
  let fixture: ComponentFixture<InventoryMovementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMovementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMovementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
