import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportChartComponent } from './rapport-chart.component';

describe('RapportChartComponent', () => {
  let component: RapportChartComponent;
  let fixture: ComponentFixture<RapportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
