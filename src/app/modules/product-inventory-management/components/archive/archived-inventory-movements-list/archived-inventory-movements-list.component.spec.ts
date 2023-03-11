import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedInventoryMovementsListComponent } from './archived-inventory-movements-list.component';

describe('ArchivedInventoryMovementsListComponent', () => {
  let component: ArchivedInventoryMovementsListComponent;
  let fixture: ComponentFixture<ArchivedInventoryMovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedInventoryMovementsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedInventoryMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
