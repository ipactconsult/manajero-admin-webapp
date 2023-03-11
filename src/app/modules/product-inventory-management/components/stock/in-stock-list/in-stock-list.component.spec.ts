import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InStockListComponent } from './in-stock-list.component';

describe('InStockListComponent', () => {
  let component: InStockListComponent;
  let fixture: ComponentFixture<InStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InStockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
