import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMaterialComponent } from './stock-material.component';

describe('StockMaterialComponent', () => {
  let component: StockMaterialComponent;
  let fixture: ComponentFixture<StockMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
