import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPurchaseReturnsListComponent } from './archived-purchase-returns-list.component';

describe('ArchivedPurchaseReturnsListComponent', () => {
  let component: ArchivedPurchaseReturnsListComponent;
  let fixture: ComponentFixture<ArchivedPurchaseReturnsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPurchaseReturnsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPurchaseReturnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
