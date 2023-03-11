import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriesGridComponent } from './inventories-grid.component';

describe('InventoriesGridComponent', () => {
  let component: InventoriesGridComponent;
  let fixture: ComponentFixture<InventoriesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoriesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoriesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
