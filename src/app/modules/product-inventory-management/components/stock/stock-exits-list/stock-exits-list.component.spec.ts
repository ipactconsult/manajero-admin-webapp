import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExitsListComponent } from './stock-exits-list.component';

describe('StockExitsListComponent', () => {
  let component: StockExitsListComponent;
  let fixture: ComponentFixture<StockExitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockExitsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockExitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
