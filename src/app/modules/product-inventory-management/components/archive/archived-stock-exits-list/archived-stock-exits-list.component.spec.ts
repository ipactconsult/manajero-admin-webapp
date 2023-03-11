import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedStockExitsListComponent } from './archived-stock-exits-list.component';

describe('ArchivedStockExitsListComponent', () => {
  let component: ArchivedStockExitsListComponent;
  let fixture: ComponentFixture<ArchivedStockExitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedStockExitsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedStockExitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
