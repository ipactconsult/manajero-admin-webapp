import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InStockGridComponent } from './in-stock-grid.component';

describe('InStockGridComponent', () => {
  let component: InStockGridComponent;
  let fixture: ComponentFixture<InStockGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InStockGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InStockGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
