import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryContractsComponent } from './history-contracts.component';

describe('HistoryContractsComponent', () => {
  let component: HistoryContractsComponent;
  let fixture: ComponentFixture<HistoryContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
