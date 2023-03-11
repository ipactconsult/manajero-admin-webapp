import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWarehouseComponent } from './details-warehouse.component';

describe('DetailsWarehouseComponent', () => {
  let component: DetailsWarehouseComponent;
  let fixture: ComponentFixture<DetailsWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
