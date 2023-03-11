import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighLevelRiskTableComponent } from './high-level-risk-table.component';

describe('HighLevelRiskTableComponent', () => {
  let component: HighLevelRiskTableComponent;
  let fixture: ComponentFixture<HighLevelRiskTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighLevelRiskTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighLevelRiskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
