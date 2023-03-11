import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContractsComponent } from './grid-contracts.component';

describe('GridContractsComponent', () => {
  let component: GridContractsComponent;
  let fixture: ComponentFixture<GridContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
