import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalMoreInfoComponent } from './statistical-more-info.component';

describe('StatisticalMoreInfoComponent', () => {
  let component: StatisticalMoreInfoComponent;
  let fixture: ComponentFixture<StatisticalMoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticalMoreInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
