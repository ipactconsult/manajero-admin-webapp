import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeForForecastComponent } from './select-type-for-forecast.component';

describe('SelectTypeForForecastComponent', () => {
  let component: SelectTypeForForecastComponent;
  let fixture: ComponentFixture<SelectTypeForForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTypeForForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTypeForForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
