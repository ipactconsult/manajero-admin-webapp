import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastHelperComponent } from './forecast-helper.component';

describe('ForecastHelperComponent', () => {
  let component: ForecastHelperComponent;
  let fixture: ComponentFixture<ForecastHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
