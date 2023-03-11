import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMovementsListComponent } from './inventory-movements-list.component';

describe('InventoryMovementsListComponent', () => {
  let component: InventoryMovementsListComponent;
  let fixture: ComponentFixture<InventoryMovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMovementsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
