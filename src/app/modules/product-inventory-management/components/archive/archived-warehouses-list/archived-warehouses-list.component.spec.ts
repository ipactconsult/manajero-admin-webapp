import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedWarehousesListComponent } from './archived-warehouses-list.component';

describe('ArchivedWarehousesListComponent', () => {
  let component: ArchivedWarehousesListComponent;
  let fixture: ComponentFixture<ArchivedWarehousesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedWarehousesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedWarehousesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
