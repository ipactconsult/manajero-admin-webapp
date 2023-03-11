import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReceiptsComponent } from './grid-receipts.component';

describe('GridReceiptsComponent', () => {
  let component: GridReceiptsComponent;
  let fixture: ComponentFixture<GridReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
